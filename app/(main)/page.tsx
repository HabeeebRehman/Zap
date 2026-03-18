"use client";

import useGetPosts from "@/features/post/api/use-get-posts";
import useNewPost from "@/features/post/api/use-new-post";
import NewPostForm from "@/features/post/components/new-post-form";
import PostsContainer from "@/features/post/components/posts-container";
import ErrorCard from "@/components/error-card";
import NoDataCard from "@/components/no-data-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/use-session";

export default function HomePage() {
  const { session, status } = useSession();
  const postsQuery = useGetPosts();
  const postMutation = useNewPost();

  const isError = postsQuery.isError || status === "error";
  const isLoading = postsQuery.isLoading || postsQuery.isPending || status === "pending" || !session || !session?.user;
  const isPending = postMutation.isPending;

  if (isError) return <div className="p-4"><ErrorCard /></div>;
  if (isLoading) return <HomePageSkeleton />;

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="sticky top-0 z-10 bg-card/60 backdrop-blur-xl border-b px-6 py-4">
        <h1 className="text-xl font-black tracking-tight italic">Feed</h1>
      </div>
      
      <div className="p-4 sm:p-6 border-b bg-accent/5">
        <NewPostForm 
          curUser={{ 
            name: session.user.name as string | undefined, 
            image: session.user.image as string | undefined 
          }} 
          defaultValues={{ content: "", image: null }} 
          isPending={isPending} 
          onSubmit={(values) => postMutation.mutate({ ...values })} 
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {postsQuery.data && postsQuery.data.length > 0 ? (
          <PostsContainer posts={postsQuery.data} curUserId={session?.user?.id} />
        ) : (
          <div className="p-12 text-center">
            <NoDataCard />
          </div>
        )}
      </div>
    </div>
  );
}

const HomePageSkeleton = () => (
  <div className="flex flex-col gap-4 p-4">
    <Skeleton className="h-8 w-24 rounded-md" />
    <div className="flex gap-4 items-start pt-4 border-t">
      <Skeleton className="size-10 rounded-full shrink-0" />
      <div className="flex-1 space-y-4">
        <Skeleton className="h-24 w-full rounded-xl" />
        <div className="flex justify-between">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>
    </div>
    {[1, 2].map((i) => (
      <div key={i} className="space-y-4 pt-8 border-t">
        <div className="flex gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-3 w-1/6" />
          </div>
        </div>
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    ))}
  </div>
);
