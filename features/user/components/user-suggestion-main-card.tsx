"use client";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import useGetCurUserFollowing from "../api/use-get-cur-user-following";
import { Skeleton } from "@/components/ui/skeleton";
import useGetCurUserSuggestion from "../api/use-get-cur-user-suggestion";

export default function UserSuggestionMainCard() {
  const userSuggestionQuery = useGetCurUserSuggestion();

  const isError = userSuggestionQuery.isError;
  const isLoading = userSuggestionQuery.isLoading || userSuggestionQuery.isPending;

  if (isError) return null;
  if (isLoading) return <UserSuggestionMainCardSkeleton />;
  if (!userSuggestionQuery.data || userSuggestionQuery.data.length === 0) return null;

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="font-bold">Suggested for you</h2>
      </div>
      <div className="p-2 space-y-1">
        {userSuggestionQuery.data.slice(0, 5).map((user) => (
          <div key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors group">
            <Link href={`/users/${user.id}`} className="flex items-center gap-3 flex-1 min-w-0">
              <UserAvatar className="size-10 border shadow-sm" fallbackText={user.username} image={user.image || undefined} />
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
              </div>
            </Link>
            <Button variant="outline" size="sm" className="h-8 rounded-full text-xs" asChild>
              <Link href={`/users/${user.id}`}>View</Link>
            </Button>
          </div>
        ))}
      </div>
      <Link 
        href="/search" 
        className="block p-3 text-center text-xs font-medium text-primary hover:bg-primary/5 transition-colors border-t"
      >
        Show more
      </Link>
    </div>
  );
}

const UserSuggestionMainCardSkeleton = () => (
  <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
    <div className="p-4 border-b">
      <Skeleton className="h-5 w-32" />
    </div>
    <div className="p-2 space-y-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3 p-2">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
          <Skeleton className="h-8 w-16 rounded-full" />
        </div>
      ))}
    </div>
  </div>
);
