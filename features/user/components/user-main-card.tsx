"use client";
import { Button } from "@/components/ui/button";
import useGetCurUser from "../api/use-get-cur-user";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/user-avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function UserMainCard() {
  const userQuery = useGetCurUser();

  if (userQuery.isLoading || userQuery.isPending) return <UserMainCardSkeleton />;
  if (userQuery.error || !userQuery.data) return null;

  const { bio, followersCount, followingCount, id, image, name, username } = userQuery.data;

  return (
    <div className="bg-card rounded-xl overflow-hidden border shadow-sm">
      <div className="h-24 bg-gradient-to-r from-primary/80 to-primary" />
      <div className="px-4 pb-4">
        <div className="relative flex justify-between items-end -mt-10 mb-4">
          <UserAvatar 
            className="size-20 border-4 border-card shadow-md" 
            image={image || undefined} 
            fallbackText={username} 
          />
          <Button variant="outline" size="sm" className="rounded-full h-8" asChild>
            <Link href={`/users/${id}`}>Edit Profile</Link>
          </Button>
        </div>
        
        <div className="space-y-1">
          <h3 className="text-lg font-bold leading-none capitalize">{name}</h3>
          <p className="text-muted-foreground text-sm">@{username}</p>
        </div>

        {bio && <p className="mt-3 text-sm leading-relaxed line-clamp-3">{bio}</p>}

        <div className="flex gap-4 mt-4 pt-4 border-t">
          <Link href={`/users/${id}/following`} className="flex gap-1 items-center hover:underline decoration-muted-foreground/50">
            <span className="font-bold text-sm">{followingCount}</span>
            <span className="text-muted-foreground text-xs">Following</span>
          </Link>
          <Link href={`/users/${id}/followers`} className="flex gap-1 items-center hover:underline decoration-muted-foreground/50">
            <span className="font-bold text-sm">{followersCount}</span>
            <span className="text-muted-foreground text-xs">Followers</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

const UserMainCardSkeleton = () => (
  <div className="bg-card rounded-xl overflow-hidden border shadow-sm p-4 space-y-4">
    <div className="flex justify-between items-end">
      <Skeleton className="size-20 rounded-full" />
      <Skeleton className="h-8 w-24 rounded-full" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-4 w-1/3" />
    </div>
    <div className="space-y-2 pt-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  </div>
);
