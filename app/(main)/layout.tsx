import Header from "@/components/layout/header";
import LeftSidebar from "@/components/layout/sidebar/left-sidebar";
import RightSidebar from "@/components/layout/sidebar/right-sidebar";
import MobileNav from "@/components/layout/mobile-nav";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="border-b bg-card/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="container max-w-7xl">
          <Header />
        </div>
      </div>
      <div className="flex-1 container max-w-7xl px-0 sm:px-4">
        <div className="flex gap-0 sm:gap-6 py-0 sm:py-6 h-full min-h-[calc(100vh-4rem)]">
          <LeftSidebar className="hidden lg:block w-64 shrink-0" />
          <main className="flex-1 min-w-0 bg-card sm:rounded-2xl border-x sm:border shadow-sm overflow-hidden flex flex-col mb-16 sm:mb-0">
            {children}
          </main>
          <RightSidebar className="hidden xl:block w-80 shrink-0" />
        </div>
      </div>

      <MobileNav />
    </div>
  );
}
