"use client";

import useGetSearchPosts from "@/features/post/api/use-get-search-posts";
import PostsContainer from "@/features/post/components/posts-container";
import ErrorCard from "@/components/error-card";
import NoDataCard from "@/components/no-data-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/use-session";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const { session, status } = useSession();
  const postsQuery = useGetSearchPosts(searchQuery);

  const isError = postsQuery.isError || status === "error";
  const isLoading = postsQuery.isLoading || postsQuery.isPending || status === "pending" || !session || !session?.user;

  if (isError) return <ErrorCard />;
  if (isLoading) return <SearchPageSkeleton />;
  if (postsQuery.data.length === 0) return <NoDataCard />;

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="sticky top-0 z-10 bg-card/60 backdrop-blur-xl border-b px-6 py-4 flex items-center gap-4">
        <h1 className="text-xl font-black tracking-tight italic capitalize">
          {searchQuery ? `Search: ${searchQuery}` : "Explore"}
        </h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6">
          <PostsContainer posts={postsQuery.data} curUserId={session?.user?.id} />
        </div>
      </div>
    </div>
  );
}

const SearchPageSkeleton = () => (
  <div className="w-full space-y-3">
    <div className="flex items-center gap-2 w-full">
      <Skeleton className="size-16 rounded-full shrink-0" />
      <div className="w-full space-y-2">
        <Skeleton className="w-3/12 h-7 rounded-md" />
        <Skeleton className="w-7/12 h-7 rounded-md" />
      </div>
    </div>
    <Skeleton className="w-full h-56 rounded-md" />
    <Skeleton className="w-full h-72 rounded-md" />
  </div>
);
