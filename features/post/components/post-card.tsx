import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";

import { Dot, MessageCircleHeart } from "lucide-react";
import LikeBtn from "@/features/like/components/like-btn";
import UserAvatar from "@/components/user-avatar";
import PostActions from "./post-actions";

type props = {
  curUserId?: string;
  post: {
    id: string;
    content: string;
    image: string | null;
    createdAt: string;
    userId: string;
    isLiked: boolean;
    user: string;
    username: string;
    userImage: string | null;
    commentCount: number;
    likeCount: number;
  };
};

export default function PostCard({ post, curUserId }: props) {
  return (
    <Card className="border-none shadow-none hover:bg-accent/5 transition-colors duration-200 rounded-none border-b last:border-b-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/users/${post.userId}`}>
              <UserAvatar fallbackText={post.username} image={post.userImage || undefined} className="size-10 border shadow-sm" />
            </Link>

            <div className="flex flex-col">
              <Link href={`/users/${post.userId}`} className="font-semibold hover:underline decoration-primary/50 underline-offset-2 capitalize">
                {post.user}
              </Link>
              <p className="text-muted-foreground text-xs leading-none">@{post.username}</p>
            </div>
            <div className="flex items-center text-muted-foreground text-xs">
              <Dot className="size-4" />
              {post.createdAt && formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true })}
            </div>
          </div>
          {curUserId === post.userId && <PostActions postId={post.id} />}
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
          {renderContentWithTags(post.content)}
        </div>
        {post.image && (
          <div className="mt-3 overflow-hidden rounded-xl border bg-muted/30 max-h-[500px] flex items-center justify-center">
            <Image 
              src={post.image} 
              alt={post.content} 
              width={800} 
              height={800} 
              className="object-contain w-full h-full hover:scale-[1.02] transition-transform duration-500" 
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center gap-6 pb-4">
        <LikeBtn isLiked={post.isLiked} likeCount={post.likeCount} postId={post.id} />
        <Button asChild size="sm" variant="ghost" className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors gap-2 px-2 h-9">
          <Link href={`/posts/${post.id}`}>
            <MessageCircleHeart size={18} />
            <span className="font-medium">{post.commentCount}</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

// function to mark the tags
function renderContentWithTags(text: string) {
  const regex = /#(\w+)/g;
  // debugger;
  return text.split(regex).map((part, index) =>
    index % 2 === 1 ? (
      <Link className="text-blue-500 hover:underline" href={`/search?q=${part}`} key={index}>
        #{part}
      </Link>
    ) : (
      part
    )
  );
}
