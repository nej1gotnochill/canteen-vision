import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, Package, Brain, ShoppingBag, Trash2 } from "lucide-react";

const items = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/dashboard/inventory", label: "Stock", icon: Package },
  { to: "/dashboard/predictions", label: "AI", icon: Brain },
  { to: "/dashboard/orders", label: "Orders", icon: ShoppingBag },
  { to: "/dashboard/waste", label: "Waste", icon: Trash2 },
] as const;

export function MobileNav() {
  const loc = useLocation();
  return (
    <nav className="lg:hidden fixed bottom-3 left-3 right-3 z-40 rounded-2xl bg-sidebar text-sidebar-foreground shadow-card flex justify-around p-2">
      {items.map((it) => {
        const active = loc.pathname === it.to;
        return (
          <Link
            key={it.to}
            to={it.to}
            className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition ${active ? "bg-accent text-accent-foreground" : "text-white/70"}`}
          >
            <it.icon size={18} />
            <span className="text-[10px] font-medium">{it.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
