"use client";
import UserFollowingMainCard from "@/features/user/components/user-following-main-card";
import UserSuggestionMainCard from "@/features/user/components/user-suggestion-main-card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RightSidebar({ className }: { className: string }) {
  const pathname = usePathname();

  // Don't show on profile or following pages to avoid redundancy
  if (pathname.startsWith("/users") || pathname.startsWith("/following")) return null;

  return (
    <div className={cn("space-y-6 sticky top-20", className)}>
      <UserSuggestionMainCard />
      <UserFollowingMainCard />
      
      <div className="px-4 text-xs text-muted-foreground">
        <nav className="flex flex-wrap gap-x-3 gap-y-1">
          <Link href="#" className="hover:underline">About</Link>
          <Link href="#" className="hover:underline">Help Center</Link>
          <Link href="#" className="hover:underline">Terms of Service</Link>
          <Link href="#" className="hover:underline">Privacy Policy</Link>
          <Link href="#" className="hover:underline">Cookie Policy</Link>
          <Link href="#" className="hover:underline">Accessibility</Link>
        </nav>
        <p className="mt-4">© 2026 Zap Social</p>
      </div>
    </div>
  );
}
