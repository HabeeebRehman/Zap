import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit2, EllipsisVertical, Trash2 } from "lucide-react";
import useDeletePost from "../api/use-delete-post";
import Spinner from "@/components/spinner";
import useConfirm from "@/hooks/use-confirm";
import useEditPostDialog from "../hooks/use-edit-post-dialog";

import { Button } from "@/components/ui/button";

type props = {
  postId: string;
};

export default function PostActions({ postId }: props) {
  const [ConfirmationDialog, confirm] = useConfirm();
  const { onOpen } = useEditPostDialog();
  const deletePostMutation = useDeletePost();
  const isPending = deletePostMutation.isPending;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full size-8 hover:bg-muted text-muted-foreground transition-colors">
            <EllipsisVertical size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-lg border-muted-foreground/10">
          <DropdownMenuItem
            className="flex items-center gap-2 py-2 cursor-pointer transition-colors"
            disabled={isPending}
            onClick={() => onOpen(postId)}
          >
            <Edit2 size={16} />
            <span className="font-medium">Edit</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2 py-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 transition-colors"
            disabled={isPending}
            onClick={async () => {
              const ok = await confirm();
              if (ok) {
                deletePostMutation.mutate({ id: postId });
              }
            }}
          >
            {isPending ? <Spinner size={16} /> : <Trash2 size={16} />}
            <span className="font-medium">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmationDialog />
    </>
  );
}
