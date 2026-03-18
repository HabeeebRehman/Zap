import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import client from "@/server/client";
import { InferRequestType, InferResponseType } from "hono";
import { handleErrors } from "@/lib/errors";

const $post = client.api.v1.like.post[":id"].$post;

type resT = InferResponseType<typeof $post>;
type reqT = InferRequestType<typeof $post>["param"];

export default function useTogglePostLike() {
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
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["post", id] });
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPost = queryClient.getQueryData(["post", id]);
      const previousPosts = queryClient.getQueryData(["posts"]);

      // Update individual post
      if (previousPost) {
        queryClient.setQueryData(["post", id], (old: any) => {
          if (!old) return old;
          const isLiked = old.isLiked;
          return {
            ...old,
            isLiked: !isLiked,
            likeCount: isLiked ? old.likeCount - 1 : old.likeCount + 1,
          };
        });
      }

      // Update posts in list
      if (previousPosts) {
        queryClient.setQueriesData({ queryKey: ["posts"] }, (old: any) => {
          if (!old) return old;
          // Handles both arrays and paginated responses if applicable
          const updatePost = (p: any) => {
            if (p.id === id) {
              const isLiked = p.isLiked;
              return {
                ...p,
                isLiked: !isLiked,
                likeCount: isLiked ? p.likeCount - 1 : p.likeCount + 1,
              };
            }
            return p;
          };

          if (Array.isArray(old)) {
            return old.map(updatePost);
          }
          if (old.data && Array.isArray(old.data)) {
            return { ...old, data: old.data.map(updatePost) };
          }
          return old;
        });
      }

      return { previousPost, previousPosts };
    },
    onError: (err, { id }, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(["post", id], context.previousPost);
      }
      if (context?.previousPosts) {
        queryClient.setQueriesData({ queryKey: ["posts"] }, context.previousPosts);
      }
      toast.error(err.message);
    },
    onSettled: (_data, _error, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["post", id] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return mutation;
}
