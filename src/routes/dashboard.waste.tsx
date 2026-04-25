import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trash2, Leaf, Lightbulb } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { DashboardLayout } from "@/components/canteen/DashboardLayout";
import { StatCard } from "@/components/canteen/StatCard";
import { useDashboardSnapshot } from "@/hooks/useDashboardSnapshot";

const wastedItems = [
  { name: "Sandwich", qty: 12, reason: "Expired", emoji: "🥪" },
  { name: "Patties", qty: 8, reason: "Unused", emoji: "🥟" },
  { name: "Cold Coffee", qty: 5, reason: "Returned", emoji: "🥤" },
  { name: "Burger Buns", qty: 9, reason: "Expired", emoji: "🍔" },
];

const tips = [
  "Reduce Sandwich prep by 20% on Mondays — historically low demand.",
  "Move Patties to combo offers near 3 PM to clear inventory.",
  "Brew Cold Coffee in smaller batches (5 cups) instead of 15.",
];

export const Route = createFileRoute("/dashboard/waste")({
  component: Waste,
});

function Waste() {
  const snapshot = useDashboardSnapshot();

  return (
    <DashboardLayout title="Waste Tracker" subtitle="Monitor and reduce food waste this week">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="This Week Waste" value={snapshot.waste.summary.thisWeekWaste} suffix=" kg" icon={Trash2} change={-18} variant="orange" />
        <StatCard label="Saved vs Last Week" value={snapshot.waste.summary.savedVsLastWeek} suffix=" kg" icon={Leaf} variant="success" />
        <StatCard label="Waste Cost" value={snapshot.waste.summary.wasteCost} prefix="₹" icon={Trash2} change={-22} variant="navy" />
        <StatCard label="Items Flagged" value={snapshot.waste.summary.itemsFlagged} icon={Lightbulb} variant="light" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl bg-card p-5 shadow-soft border border-border">
          <h3 className="font-display font-bold mb-4">Weekly Waste (kg)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={snapshot.waste.weeklyWaste}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Bar dataKey="kg" fill="var(--accent)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl bg-gradient-navy p-5 text-white shadow-card relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl glass"><Lightbulb className="h-4 w-4" /></div>
              <h3 className="font-display font-bold">AI Suggestions</h3>
            </div>
            <ul className="space-y-3">
                {snapshot.waste.tips.map((t, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="flex gap-2 text-sm text-white/90"
                >
                  <span className="text-accent">✦</span> {t}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-card p-5 shadow-soft border border-border">
        <h3 className="font-display font-bold mb-4">Wasted / Expired Items</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {snapshot.waste.wastedItems.map((it, i) => (
            <motion.div
              key={it.name}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-xl bg-secondary p-4 flex items-center gap-3"
            >
              <div className="text-3xl">{it.emoji}</div>
              <div>
                <p className="font-semibold">{it.name}</p>
                <p className="text-xs text-muted-foreground">{it.qty} units · {it.reason}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
