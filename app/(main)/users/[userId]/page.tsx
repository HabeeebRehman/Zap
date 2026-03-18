"use client";

import useGetUserPosts from "@/features/post/api/use-get-user-posts";
import PostsContainer from "@/features/post/components/posts-container";
import useGetUser from "@/features/user/api/use-get-user";
import UserInfoHeader from "@/features/user/components/user-info-header";
import ErrorCard from "@/components/error-card";
import NotFoundCard from "@/components/not-found-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserId } from "@/hooks/use-get-user-id";

type props = { params: { userId: string } };

export default function UserPage({ params: { userId } }: props) {
  const curUserId = useGetUserId();
  const userQuery = useGetUser({ userId });
  const userPostsQuery = useGetUserPosts({ userId });

  const isError = userQuery.isError || userPostsQuery.isError;
  const isLoading = userQuery.isLoading || userQuery.isPending || userPostsQuery.isLoading || userPostsQuery.isPending || (curUserId === undefined);

  if (isError) return <ErrorCard />;
  if (isLoading) return <UserInfoHeaderSkeleton />;
  if (!userQuery.data) return <NotFoundCard />;

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="p-3 overflow-y-auto flex-1">
        <UserInfoHeader user={{ ...userQuery.data, backgroundImage: null }} curUserId={curUserId || ""} />

        <div className="mt-6">
          <PostsContainer posts={userPostsQuery.data} curUserId={curUserId || ""} />
        </div>
      </div>
    </div>
  );
}

const UserInfoHeaderSkeleton = () => (
  <div className="space-y-2">
    <Skeleton className="w-full h-52 rounded-md" />
    <div className="flex items-center gap-3 w-full">
      <Skeleton className="size-24 rounded-full flex-shrink-0" />
      <div className="w-full space-y-2">
        <Skeleton className="w-7/12 h-8 rounded-md" />
        <Skeleton className="w-24 h-8 rounded-md" />
      </div>
    </div>
  </div>
);
