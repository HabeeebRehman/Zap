export default function Logo() {
  return (
    <div className="flex items-center gap-2 group cursor-pointer">
      <div className="size-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:rotate-3">
        <span className="text-xl font-black text-white italic tracking-tighter">Z</span>
      </div>
      <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 hidden sm:block">
        ZAP
      </span>
    </div>
  );
}
