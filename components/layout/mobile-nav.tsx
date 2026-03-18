"use client";

import { Compass, Home, MessageSquare, User, Bell, Hash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetUserId } from "@/hooks/use-get-user-id";
import { cn } from "@/lib/utils";

export default function MobileNav() {
  const pathname = usePathname();
  const userId = useGetUserId();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t z-50 sm:hidden">
      <nav className="flex justify-around items-center h-16 px-4">
        <MobileNavItem icon={Home} href="/" active={pathname === "/"} />
        <MobileNavItem icon={Compass} href="/search" active={pathname === "/search" && !pathname.includes("q=trending")} />
        <MobileNavItem icon={Bell} href="/notifications" active={pathname === "/notifications"} />
        <MobileNavItem icon={Hash} href="/search?q=trending" active={pathname.includes("q=trending")} />
        <MobileNavItem icon={MessageSquare} href="/messages" active={pathname === "/messages"} />
        <MobileNavItem icon={User} href={userId ? `/users/${userId}` : "/sign-in"} active={userId ? pathname === `/users/${userId}` : false} />
      </nav>
    </div>
  );
}

function MobileNavItem({ icon: Icon, href, active }: { icon: any, href: string, active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={cn(
        "flex flex-col items-center justify-center size-12 transition-colors",
        active ? "text-primary" : "text-muted-foreground hover:text-primary"
      )}
    >
      <Icon size={24} className={cn(active && "stroke-[2.5px]")} />
    </Link>
  );
}
