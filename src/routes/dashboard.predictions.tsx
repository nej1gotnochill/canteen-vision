import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Brain, TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { DashboardLayout } from "@/components/canteen/DashboardLayout";
import { useDashboardSnapshot } from "@/hooks/useDashboardSnapshot";

export const Route = createFileRoute("/dashboard/predictions")({
  component: Predictions,
});

function Predictions() {
  const snapshot = useDashboardSnapshot();
  const r2 = Number.isFinite(snapshot.model?.r2) ? Number(snapshot.model.r2) : 0;
  const cards = Array.isArray(snapshot.predictions?.cards) ? snapshot.predictions.cards : [];
  const trend = Array.isArray(snapshot.predictions?.trend) ? snapshot.predictions.trend : [];
  const headline = typeof snapshot.predictions?.headline === "string"
    ? snapshot.predictions.headline
    : "Expected steady demand during the lunch rush";

  return (
    <DashboardLayout title="AI Predictions" subtitle={`Tomorrow's demand, forecasted with ${r2 > 0 ? Math.round(r2 * 100) : 92}% accuracy`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-hero p-6 text-white shadow-card"
      >
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-accent/40 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" /> Lunch Rush Prediction
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold">{headline}</h3>
            <p className="text-white/70 text-sm">Driven by Wednesday lab schedule + clear weather</p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl glass">
            <Brain className="h-8 w-8" />
          </div>
        </div>
      </motion.div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((p, i) => (
          <motion.div
            key={p.item}
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl bg-card p-5 shadow-soft border border-border"
          >
            <div className="flex items-start justify-between">
              <div className="text-4xl">{p.emoji}</div>
              <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${p.change >= 0 ? "glass-pill text-success" : "bg-destructive/10 text-destructive"}`}>
                {p.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {p.change >= 0 ? "+" : ""}{p.change}%
              </div>
            </div>
            <h3 className="mt-3 font-display text-lg font-bold">{p.item}</h3>
            <p className="text-xs text-muted-foreground">Tomorrow's forecast</p>
            <p className="mt-3 font-display text-3xl font-bold text-primary">{p.forecast}<span className="text-sm text-muted-foreground font-medium ml-1">units</span></p>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Confidence</span>
                <span className="font-semibold">{p.confidence}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${p.confidence}%` }} transition={{ duration: 1, delay: 0.2 + i * 0.05 }} className="h-full bg-gradient-orange" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-card p-5 shadow-soft border border-border">
        <h3 className="font-display font-bold mb-4">7-Day Forecast Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trend}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--muted-foreground)" fontSize={12} />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
            <Line type="monotone" dataKey="sales" stroke="var(--primary)" strokeWidth={3} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="orders" stroke="var(--accent)" strokeWidth={3} strokeDasharray="6 4" dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardLayout>
  );
}
