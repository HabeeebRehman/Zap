import { Button } from "@/components/ui/button";
import useFollowUser from "../api/use-follow-user";
import { useState } from "react";

type props = { userId: string; isFollowed: boolean };
export default function FollowBtn({ userId, isFollowed }: props) {
  const followUserMutation = useFollowUser();

  const isPending = followUserMutation.isPending;

  const onClick = () => {
    followUserMutation.mutate({ id: userId });
  };

  return (
    <Button 
      disabled={isPending} 
      variant={isFollowed ? "secondary" : "default"} 
      onClick={onClick}
      className="rounded-full px-6 font-bold transition-all active:scale-95"
    >
      {isFollowed ? "Following" : "Follow"}
    </Button>
  );
}
