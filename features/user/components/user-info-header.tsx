import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import FollowBtn from "./follow-btn";
import useEditProfileDialog from "../hooks/use-edit-profile-dialog";
import { Edit } from "lucide-react";
import Spinner from "@/components/spinner";
import NewPostForm from "@/features/post/components/new-post-form";
import useNewPost from "@/features/post/api/use-new-post";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

type props = {
  curUserId: string;
  user: {
    id: string;
    name: string;
    username: string;
    backgroundImage: string | null;
    image: string | null;
    bio: string | null;
    email: string;
    followingCount: number;
    followersCount: number;
    isFollowed: boolean;
  };
};

export default function UserInfoHeader({ user, curUserId }: props) {
  const { onOpen: onEditProfileDialogOpen } = useEditProfileDialog();
  const postMutation = useNewPost();
  const isPending = postMutation.isPending;

  return (
    <div className="flex flex-col">
      {/* Cover Image & Profile Photo Section */}
      <div className="relative mb-4 group">
        <div className="w-full h-48 sm:h-64 overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
          {user.backgroundImage ? (
            <img src={user.backgroundImage} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          )}
        </div>
        
        <div className="absolute -bottom-16 left-4 sm:left-8 flex items-end gap-4 sm:gap-6">
          <UserAvatar 
            className="size-32 sm:size-40 border-4 border-background shadow-xl ring-2 ring-primary/5 rounded-full bg-card" 
            fallbackText={user.username} 
            image={user.image || undefined} 
          />
        </div>

        <div className="absolute -bottom-12 right-4 flex items-center gap-2">
          {curUserId === user.id ? (
            <Button 
              variant="outline" 
              onClick={() => onEditProfileDialogOpen()}
              className="rounded-full font-bold shadow-sm transition-all hover:bg-accent px-6"
            >
              <Edit size={16} className="mr-2" /> Edit profile
            </Button>
          ) : (
            <FollowBtn userId={user.id} isFollowed={user.isFollowed} />
          )}
        </div>
      </div>

      {/* User Information Section */}
      <div className="mt-16 px-4 sm:px-8 pb-6 border-b">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{user.name}</h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground">
            <span className="font-medium text-primary">@{user.username}</span>
            <span className="text-xs">•</span>
            <span className="text-sm truncate">{user.email}</span>
          </div>
        </div>

        {user.bio && (
          <p className="mt-4 text-sm sm:text-base leading-relaxed max-w-2xl text-foreground/80 font-medium">
            {user.bio}
          </p>
        )}

        <div className="flex gap-6 mt-6">
          <Link href={`/users/${user.id}/following`} className="group flex flex-col items-start gap-0.5 hover:bg-accent/50 p-1 px-2 -ml-2 rounded-lg transition-colors">
            <span className="text-lg font-black">{user.followingCount}</span>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider group-hover:text-primary transition-colors">Following</span>
          </Link>
          <Link href={`/users/${user.id}/followers`} className="group flex flex-col items-start gap-0.5 hover:bg-accent/50 p-1 px-2 rounded-lg transition-colors">
            <span className="text-lg font-black">{user.followersCount}</span>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider group-hover:text-primary transition-colors">Followers</span>
          </Link>
        </div>
      </div>

      {/* Post Creation Section for Own Profile */}
      {curUserId === user.id && (
        <div className="p-4 sm:p-6 bg-accent/5 border-b">
          <NewPostForm 
            curUser={{ name: user.name, image: user.image || undefined }} 
            defaultValues={{ content: "", image: null }} 
            isPending={isPending} 
            onSubmit={(values) => postMutation.mutate({ ...values })} 
          />
        </div>
      )}
    </div>
  );
}
