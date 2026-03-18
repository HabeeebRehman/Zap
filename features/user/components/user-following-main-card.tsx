"use client";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/user-avatar";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import useGetCurUserFollowing from "../api/use-get-cur-user-following";
import { Skeleton } from "@/components/ui/skeleton";
import NoDataCard from "@/components/no-data-card";

export default function UserFollowingMainCard() {
  const userFollowingQuery = useGetCurUserFollowing();

  const isError = userFollowingQuery.isError;
  const isLoading = userFollowingQuery.isLoading || userFollowingQuery.isPending;

  if (isError) return null;
  if (isLoading) return <UserFollowingMainCardSkeleton />;
  if (!userFollowingQuery.data || userFollowingQuery.data.length === 0) return null;

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-bold">Your following</h2>
        <span className="text-xs bg-muted px-2 py-0.5 rounded-full font-medium">
          {userFollowingQuery.data.length}
        </span>
      </div>
      <div className="p-2 grid grid-cols-4 gap-2">
        {userFollowingQuery.data.slice(0, 8).map((user) => (
          <Link 
            key={user.id} 
            href={`/users/${user.id}`} 
            className="group relative flex flex-col items-center gap-1 transition-transform hover:scale-105"
          >
            <UserAvatar 
              className="size-12 border-2 border-background shadow-sm transition-all group-hover:border-primary/50" 
              fallbackText={user.username} 
              image={user.image || undefined} 
            />
            <span className="text-[10px] text-muted-foreground truncate w-full text-center px-1">
              {user.name.split(' ')[0]}
            </span>
          </Link>
        ))}
      </div>
      {userFollowingQuery.data.length > 8 && (
        <Link 
          href="/following" 
          className="block p-3 text-center text-xs font-medium text-primary hover:bg-primary/5 transition-colors border-t"
        >
          View all
        </Link>
      )}
    </div>
  );
}

const UserFollowingMainCardSkeleton = () => (
  <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
    <div className="p-4 border-b">
      <Skeleton className="h-5 w-24" />
    </div>
    <div className="p-4 grid grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <Skeleton className="size-12 rounded-full" />
          <Skeleton className="h-2 w-10" />
        </div>
      ))}
    </div>
  </div>
);
