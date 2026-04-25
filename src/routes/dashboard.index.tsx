import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { IndianRupee, ShoppingBag, AlertTriangle, Clock, TrendingUp } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { DashboardLayout } from "@/components/canteen/DashboardLayout";
import { StatCard } from "@/components/canteen/StatCard";
import { useDashboardSnapshot } from "@/hooks/useDashboardSnapshot";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Overview — ThaparCanteen Dashboard" }] }),
  component: Overview,
});

function Overview() {
  const snapshot = useDashboardSnapshot();

  return (
    <DashboardLayout title="Welcome back, Aman 👋" subtitle={snapshot.source === "api" ? "Live data from the Thapar canteen model" : "Preview data while the backend starts"}>
      {/* Stat grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today Revenue" value={Math.round(snapshot.overview.todayRevenue)} prefix="₹" icon={IndianRupee} change={snapshot.overview.growth} variant="navy" delay={0} />
        <StatCard label="Orders Completed" value={snapshot.overview.ordersCompleted} icon={ShoppingBag} change={8} variant="orange" delay={0.05} />
        <StatCard label="Low Stock Alerts" value={snapshot.overview.lowStockAlerts} icon={AlertTriangle} variant="light" delay={0.1} />
        <StatCard label="Peak Hour Traffic" value={snapshot.overview.peakTraffic} suffix="%" icon={Clock} change={-4} variant="light" delay={0.15} />
      </div>

      {/* Predicted card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="mt-4 relative overflow-hidden rounded-2xl bg-gradient-hero p-6 text-white shadow-card"
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/40 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-xs font-semibold">
              <TrendingUp className="h-3.5 w-3.5" /> AI Forecast
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold">Predicted Tomorrow Sales</h3>
            <p className="text-white/70 text-sm">Based on 30-day patterns + tomorrow's class schedule</p>
          </div>
          <div className="text-right">
            <p className="font-display text-4xl font-bold">₹{Math.round(snapshot.overview.predictedTomorrowSales).toLocaleString("en-IN")}</p>
            <p className="text-sm text-success">+{snapshot.overview.growth}% expected ↑</p>
          </div>
        </div>
      </motion.div>

      {/* Charts */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <ChartCard title="Daily Sales" subtitle="Last 7 days" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={snapshot.analytics.dailySales}>
              <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="sales" stroke="var(--accent)" strokeWidth={3} dot={{ r: 4, fill: "var(--accent)" }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Waste Breakdown" subtitle="This week">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={snapshot.analytics.wasteData} dataKey="value" innerRadius={55} outerRadius={90} paddingAngle={4}>
                {snapshot.analytics.wasteData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 -mt-2">
            {snapshot.analytics.wasteData.map(d => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-muted-foreground">{d.name} {d.value}%</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <ChartCard title="Top Selling Items" subtitle="Today">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={snapshot.analytics.topItems}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Bar dataKey="value" fill="var(--primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Hourly Demand Heatmap" subtitle="Today">
          <div className="grid grid-cols-8 gap-1.5 mt-2">
            {snapshot.analytics.hourlyDemand.map((h) => (
              <div key={h.hour} className="flex flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-md transition-all hover:scale-110"
                  style={{ height: `${20 + h.value * 1.6}px`, background: `oklch(0.71 0.19 45 / ${0.25 + h.value / 130})` }}
                  title={`${h.hour}: ${h.value}`}
                />
                <span className="text-[10px] text-muted-foreground">{h.hour}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">🔥 Peak rush at <span className="font-semibold text-foreground">12 PM</span> with 95% capacity.</p>
        </ChartCard>
      </div>
    </DashboardLayout>
  );
}

function ChartCard({ title, subtitle, children, className = "" }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className={`rounded-2xl bg-card p-5 shadow-soft border border-border ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display font-bold text-foreground">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {children}
    </motion.div>
  );
}
