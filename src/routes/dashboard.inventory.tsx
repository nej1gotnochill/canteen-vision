import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Pencil, Trash2, X } from "lucide-react";
import { DashboardLayout } from "@/components/canteen/DashboardLayout";
import { products } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/inventory")({
  component: Inventory,
});

function Inventory() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const filtered = products.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <DashboardLayout title="Inventory" subtitle="Live stock across all menu items">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 rounded-xl bg-card px-3 py-2.5 flex-1 min-w-[200px] shadow-soft">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search items…" className="bg-transparent outline-none text-sm flex-1" />
        </div>
        <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-gradient-orange px-4 py-2.5 text-sm font-semibold text-white shadow-glow">
          <Plus className="h-4 w-4" /> Add Item
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            whileHover={{ y: -4 }}
            className="relative rounded-2xl bg-card p-5 shadow-soft border border-border"
          >
            {p.low && (
              <span className="absolute top-3 right-3 rounded-full bg-destructive/10 text-destructive px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Low Stock</span>
            )}
            <div className="text-4xl">{p.emoji}</div>
            <h3 className="mt-3 font-display text-lg font-bold">{p.name}</h3>
            <p className="text-xs text-muted-foreground">{p.category}</p>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Stock</p>
                <p className="font-display text-2xl font-bold">{p.stock}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="font-display text-lg font-bold text-accent">₹{p.price}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-secondary px-3 py-2 text-xs font-semibold hover:bg-muted">
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
              <button className="inline-flex items-center justify-center rounded-xl bg-destructive/10 text-destructive px-3 py-2 hover:bg-destructive/20">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-card p-6 shadow-card border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl font-bold">Add New Item</h3>
                <button onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-3">
                <input placeholder="Item name (e.g. Veg Roll)" className="w-full rounded-xl bg-secondary px-4 py-3 text-sm outline-none focus:ring-2 ring-accent" />
                <input placeholder="Category" className="w-full rounded-xl bg-secondary px-4 py-3 text-sm outline-none focus:ring-2 ring-accent" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" placeholder="Price (₹)" className="rounded-xl bg-secondary px-4 py-3 text-sm outline-none focus:ring-2 ring-accent" />
                  <input type="number" placeholder="Stock" className="rounded-xl bg-secondary px-4 py-3 text-sm outline-none focus:ring-2 ring-accent" />
                </div>
                <button onClick={() => setOpen(false)} className="w-full rounded-xl bg-gradient-orange py-3 font-semibold text-white shadow-glow">
                  Add to Inventory
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
