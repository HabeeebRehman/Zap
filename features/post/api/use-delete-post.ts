import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import client from "@/server/client";
import { InferRequestType, InferResponseType } from "hono";
import { handleErrors } from "@/lib/errors";

const $delete = client.api.v1.post[":id"].$delete;

type resT = InferResponseType<typeof $delete>;
type reqT = InferRequestType<typeof $delete>["param"];

export default function useDeletePost() {
  const queryClient = useQueryClient();
  const mutation = useMutation<resT, Error, reqT>({
    mutationFn: async ({ id }) => {
      const res = await $delete({ param: { id } });

      if (!res.ok) {
        throw await handleErrors(res);
      }
      return await res.json();
    },
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      await queryClient.cancelQueries({ queryKey: ["post", id] });

      const previousPosts = queryClient.getQueryData(["posts"]);

      if (previousPosts) {
        queryClient.setQueriesData({ queryKey: ["posts"] }, (old: any) => {
          if (!old) return old;
          const filterPost = (p: any) => p.id !== id;
          if (Array.isArray(old)) return old.filter(filterPost);
          if (old.data && Array.isArray(old.data)) return { ...old, data: old.data.filter(filterPost) };
          return old;
        });
      }

      return { previousPosts };
    },
    onError: (err, _variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueriesData({ queryKey: ["posts"] }, context.previousPosts);
      }
      toast.error(err.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully");
    },
  });

  return mutation;
}
