import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import client from "@/server/client";
import { InferRequestType, InferResponseType } from "hono";
import { handleErrors } from "@/lib/errors";

const $post = client.api.v1.user.follow[":id"].$post;

type resT = InferResponseType<typeof $post>;
type reqT = InferRequestType<typeof $post>["param"];

export default function useFollowUser() {
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
      await queryClient.cancelQueries({ queryKey: ["user", id] });
      await queryClient.cancelQueries({ queryKey: ["cur_user"] });
      
      const previousUser = queryClient.getQueryData(["user", id]);
      const previousCurUser = queryClient.getQueryData(["cur_user"]);

      // Optimistically update the user being followed/unfollowed
      if (previousUser) {
        queryClient.setQueryData(["user", id], (old: any) => {
          if (!old) return old;
          const isCurrentlyFollowing = old.isFollowing;
          return {
            ...old,
            isFollowing: !isCurrentlyFollowing,
            followersCount: isCurrentlyFollowing ? old.followersCount - 1 : old.followersCount + 1
          };
        });
      }

      // Optimistically update the current user's following count
      if (previousCurUser) {
        queryClient.setQueryData(["cur_user"], (old: any) => {
          if (!old) return old;
          const isCurrentlyFollowing = (previousUser as any)?.isFollowing;
          return {
            ...old,
            followingCount: isCurrentlyFollowing ? old.followingCount - 1 : old.followingCount + 1
          };
        });
      }

      return { previousUser, previousCurUser };
    },
    onError: (err, { id }, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(["user", id], context.previousUser);
      }
      if (context?.previousCurUser) {
        queryClient.setQueryData(["cur_user"], context.previousCurUser);
      }
      toast.error(err.message);
    },
    onSettled: (_data, _error, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      queryClient.invalidateQueries({ queryKey: ["cur_user"] });
      queryClient.invalidateQueries({ queryKey: ["cur_user_following"] });
      queryClient.invalidateQueries({ queryKey: ["cur_user_suggestion"] });
    },
  });

  return mutation;
}
