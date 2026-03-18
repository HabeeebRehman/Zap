"use client";
import Link from "next/link";
import useGetTrendingTags from "../api/use-get-trending-tags";
import { Skeleton } from "@/components/ui/skeleton";

export default function HashtagsMainCard() {
  const trendingTagsQuery = useGetTrendingTags();

  const isLoading = trendingTagsQuery.isLoading || trendingTagsQuery.isPending;
  const isError = trendingTagsQuery.isError;

  if (isError) return null;
  if (isLoading) return <HashtagsSkeleton />;
  if (!trendingTagsQuery.data || trendingTagsQuery.data.length === 0) return null;

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="font-bold">Trending Hashtags</h2>
      </div>
      <div className="p-2">
        {trendingTagsQuery.data.map((tag) => (
          <Link 
            key={tag.name} 
            href={`/search?q=${tag.name}`} 
            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent transition-colors group"
          >
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
              #{tag.name}
            </span>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              {tag.tagCount}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const HashtagsSkeleton = () => (
  <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
    <div className="p-4 border-b">
      <Skeleton className="h-5 w-32" />
    </div>
    <div className="p-2 space-y-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center justify-between px-3 py-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-8 rounded-full" />
        </div>
      ))}
    </div>
  </div>
);
