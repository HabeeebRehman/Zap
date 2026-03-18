import Link from "next/link";

import Searchbox from "./searchbox";
import UserIcon from "./user-icon";
import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between h-16 px-4 sm:px-6">
      <div className="flex items-center gap-8 flex-1">
        <Link href="/" className="shrink-0 transition-opacity hover:opacity-80">
          <Logo />
        </Link>
        <div className="max-w-md w-full hidden lg:block">
          <Searchbox />
        </div>
      </div>

      <div className="flex items-center justify-end flex-1 gap-4">
        <ModeToggle />
        <UserIcon />
      </div>
    </header>
  );
}
