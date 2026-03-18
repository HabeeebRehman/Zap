import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type props = {
  image?: string;
  fallbackText?: string;
  className?: string;
};

export default function UserAvatar({ fallbackText, image, className }: props) {
  return (
    <Avatar className={cn("bg-muted ring-2 ring-background shadow-sm transition-transform hover:scale-105", className)}>
      <AvatarImage src={image} alt={fallbackText} className="object-cover" />
      <AvatarFallback className="bg-primary/10 text-primary font-black text-xs sm:text-sm">
        {fallbackText?.slice(0, 2).toUpperCase() || "ZA"}
      </AvatarFallback>
    </Avatar>
  );
}
