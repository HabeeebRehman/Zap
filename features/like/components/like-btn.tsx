import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import useToggleLike from "../api/use-toggle-post-like";
import { cn } from "@/lib/utils";

type props = {
  postId: string;
  likeCount: number;
  isLiked: boolean;
};

export default function LikeBtn({ postId, likeCount, isLiked }: props) {
  const toggleLikeMutation = useToggleLike();

  const isPending = toggleLikeMutation.isPending;

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLikeMutation.mutate({ id: postId });
  };

  return (
    <Button 
      disabled={isPending} 
      size="sm" 
      variant="ghost" 
      className={cn(
        "flex items-center gap-2 px-2 h-9 rounded-full transition-all group",
        isLiked ? "text-rose-500 hover:text-rose-600 hover:bg-rose-50" : "text-muted-foreground hover:text-rose-500 hover:bg-rose-50"
      )} 
      onClick={onClick}
    >
      <div className="relative">
        <Heart 
          size={18} 
          className={cn(
            "transition-all duration-300 group-active:scale-125",
            isLiked ? "fill-current" : "group-hover:scale-110"
          )} 
        />
        {isLiked && (
          <span className="absolute inset-0 animate-ping rounded-full bg-rose-400 opacity-20" />
        )}
      </div>
      <span className={cn("font-medium", isLiked && "text-rose-500")}>
        {likeCount}
      </span>
    </Button>
  );
}
