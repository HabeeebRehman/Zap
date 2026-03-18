"use client";
import HashtagsMainCard from "@/features/hashtags/components/hashtags-main-card";
import UserMainCard from "@/features/user/components/user-main-card";
import { cn } from "@/lib/utils";
import { Compass, Hash, Home, MessageSquare, User, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetUserId } from "@/hooks/use-get-user-id";

export default function LeftSidebar({ className }: { className: string }) {
  const pathname = usePathname();
  const userId = useGetUserId();

  return (
    <div className={cn("flex flex-col gap-6 sticky top-20 h-fit", className)}>
      <div className="bg-card rounded-2xl border shadow-sm overflow-hidden p-2">
        <nav className="flex flex-col gap-1">
          <SidebarItem icon={Home} label="Feed" href="/" active={pathname === "/"} />
          <SidebarItem icon={Compass} label="Explore" href="/search" active={pathname === "/search"} />
          <SidebarItem icon={Bell} label="Notifications" href="/notifications" active={pathname === "/notifications"} />
          <SidebarItem icon={Hash} label="Trending" href="/search?q=trending" active={pathname.includes("q=trending")} />
          <SidebarItem icon={MessageSquare} label="Messages" href="/messages" active={pathname === "/messages"} />
          <SidebarItem icon={User} label="Profile" href={userId ? `/users/${userId}` : "/sign-in"} active={userId ? pathname === `/users/${userId}` : false} />
        </nav>
      </div>

      <UserMainCard />
      <HashtagsMainCard />
    </div>
  );
}

function SidebarItem({ icon: Icon, label, href, active }: { icon: any, label: string, href: string, active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={cn(
        "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group",
        active 
          ? "bg-primary/10 text-primary font-bold" 
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      <Icon size={22} className={cn("transition-transform group-hover:scale-110", active && "stroke-[2.5px]")} />
      <span className="text-sm tracking-tight">{label}</span>
    </Link>
  );
}
