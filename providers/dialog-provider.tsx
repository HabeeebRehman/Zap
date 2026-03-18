"use client";

import EditCommentDialog from "@/features/comment/components/edit-comment-dialog";
import EditPostDialog from "@/features/post/components/edit-post-dialog";
import EditProfileDialog from "@/features/user/components/edit-profile-dialog";

export default function DialogProvider() {
  return (
    <>
      <EditProfileDialog />
      <EditPostDialog />
      <EditCommentDialog />
    </>
  );
}
