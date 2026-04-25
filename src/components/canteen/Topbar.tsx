import { Bell, Search } from "lucide-react";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-background/80 backdrop-blur-xl px-4 lg:px-8 py-4">
      <div className="min-w-0">
        <h1 className="font-display text-xl lg:text-2xl font-bold text-foreground truncate">{title}</h1>
        {subtitle && <p className="text-xs lg:text-sm text-muted-foreground truncate">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 lg:gap-3">
        <div className="hidden md:flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 w-64">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Search items, orders…" className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
        </div>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-secondary hover:bg-muted transition">
          <Bell className="h-4.5 w-4.5 text-foreground" size={18} />
          <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-accent ring-2 ring-background" />
        </button>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-orange text-sm font-bold text-white shadow-glow">AS</div>
      </div>
    </header>
  );
}
