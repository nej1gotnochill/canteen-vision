import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, BarChart3, Package, Brain, Trash2, ShoppingBag, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "./Logo";

const items = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/analytics", label: "Sales Analytics", icon: BarChart3 },
  { to: "/dashboard/inventory", label: "Inventory", icon: Package },
  { to: "/dashboard/predictions", label: "Predictions", icon: Brain },
  { to: "/dashboard/waste", label: "Waste Tracker", icon: Trash2 },
  { to: "/dashboard/orders", label: "Orders", icon: ShoppingBag },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar() {
  const location = useLocation();
  return (
    <aside className="hidden lg:flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground sticky top-0">
      <div className="px-6 py-6 border-b border-sidebar-border">
        <Logo light />
      </div>
      <nav className="flex-1 px-3 py-6 space-y-1">
        {items.map((item, i) => {
          const active = location.pathname === item.to;
          return (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={item.to}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white"
                }`}
              >
                <item.icon className="h-4.5 w-4.5" size={18} />
                <span>{item.label}</span>
                {active && (
                  <motion.div layoutId="active-dot" className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 rounded-xl bg-sidebar-accent p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-orange text-sm font-bold text-white">AS</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Aman Sharma</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">Canteen Owner</p>
          </div>
          <LogOut className="h-4 w-4 text-sidebar-foreground/60" />
        </div>
      </div>
    </aside>
  );
}
