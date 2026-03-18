import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import client from "@/server/client";
import { InferRequestType, InferResponseType } from "hono";
import { handleErrors } from "@/lib/errors";

const $post = client.api.v1.like.comment[":id"].$post;

type resT = InferResponseType<typeof $post>;
type reqT = InferRequestType<typeof $post>["param"];

export default function useToggleCommentLike() {
  const queryClient = useQueryClient();
  const mutation = useMutation<resT, Error, reqT>({
    mutationFn: async ({ id }) => {
      const res = await $post({ param: { id } });

      if (!res.ok) {
        throw await handleErrors(res);
      }
      return await res.json();
    },
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ["comments"] });

      const previousComments = queryClient.getQueryData(["comments"]);

      if (previousComments) {
        queryClient.setQueriesData({ queryKey: ["comments"] }, (old: any) => {
          if (!old) return old;
          const updateComment = (c: any) => {
            if (c.id === id) {
              const isLiked = c.isLiked;
              return {
                ...c,
                isLiked: !isLiked,
                likeCount: isLiked ? c.likeCount - 1 : c.likeCount + 1,
              };
            }
            return c;
          };

          if (Array.isArray(old)) {
            return old.map(updateComment);
          }
          if (old.data && Array.isArray(old.data)) {
            return { ...old, data: old.data.map(updateComment) };
          }
          return old;
        });
      }

      return { previousComments };
    },
    onError: (err, _variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueriesData({ queryKey: ["comments"] }, context.previousComments);
      }
      toast.error(err.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  return mutation;
}
