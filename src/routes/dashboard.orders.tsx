import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { DashboardLayout } from "@/components/canteen/DashboardLayout";
import { orders } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/orders")({
  component: Orders,
});

const statusStyle: Record<string, string> = {
  Completed: "bg-success/10 text-success",
  Pending: "bg-warning/20 text-foreground",
  Cancelled: "bg-destructive/10 text-destructive",
};

function Orders() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"All" | "Completed" | "Pending" | "Cancelled">("All");
  const filtered = orders.filter(o =>
    (filter === "All" || o.status === filter) &&
    (o.id.toLowerCase().includes(q.toLowerCase()) || o.item.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <DashboardLayout title="Live Orders" subtitle="Track every order in real-time">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 rounded-xl bg-card px-3 py-2.5 flex-1 min-w-[200px] shadow-soft">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search orders…" className="bg-transparent outline-none text-sm flex-1" />
        </div>
        <div className="flex gap-1.5 rounded-xl bg-card p-1 shadow-soft">
          {(["All", "Completed", "Pending", "Cancelled"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-card shadow-soft overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 border-b border-border text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <div className="col-span-2">Order ID</div>
          <div className="col-span-5">Item(s)</div>
          <div className="col-span-1">Qty</div>
          <div className="col-span-2">Total</div>
          <div className="col-span-2">Status</div>
        </div>
        {filtered.map((o, i) => (
          <motion.div
            key={o.id}
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
            className="grid grid-cols-2 md:grid-cols-12 gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-secondary/40 transition"
          >
            <div className="md:col-span-2 font-mono text-sm font-semibold text-primary">{o.id}</div>
            <div className="md:col-span-5">
              <p className="text-sm font-medium">{o.item}</p>
              <p className="text-xs text-muted-foreground">{o.time}</p>
            </div>
            <div className="md:col-span-1 text-sm">{o.qty}</div>
            <div className="md:col-span-2 font-display font-bold text-accent">₹{o.total}</div>
            <div className="md:col-span-2">
              <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${statusStyle[o.status]}`}>{o.status}</span>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && <p className="px-5 py-10 text-center text-sm text-muted-foreground">No orders match your search.</p>}
      </div>
    </DashboardLayout>
  );
}
