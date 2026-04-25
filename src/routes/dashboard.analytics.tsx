import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";
import { DashboardLayout } from "@/components/canteen/DashboardLayout";
import { StatCard } from "@/components/canteen/StatCard";
import { useDashboardSnapshot } from "@/hooks/useDashboardSnapshot";
import { IndianRupee, ShoppingBag, TrendingUp, Users } from "lucide-react";

export const Route = createFileRoute("/dashboard/analytics")({
  component: Analytics,
});

function Analytics() {
  const snapshot = useDashboardSnapshot();
  const dailySales = snapshot.analytics.dailySales;
  const weeklyRevenue = dailySales.reduce((total, point) => total + point.sales, 0);
  const totalOrders = dailySales.reduce((total, point) => total + point.orders, 0);
  const visualizationItems = snapshot.visualizations.items;
  const [hiddenVisualizations, setHiddenVisualizations] = useState<Record<string, boolean>>({});

  return (
    <DashboardLayout title="Sales Analytics" subtitle="Deep insights across your canteen revenue">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Weekly Revenue" value={Math.round(weeklyRevenue)} prefix="₹" icon={IndianRupee} change={14} variant="navy" />
        <StatCard label="Orders" value={totalOrders} icon={ShoppingBag} change={9} variant="orange" />
        <StatCard label="Avg Order" value={Math.round(weeklyRevenue / Math.max(totalOrders, 1))} prefix="₹" icon={TrendingUp} change={3} variant="light" />
        <StatCard label="Unique Customers" value={Math.round(totalOrders * 0.46)} icon={Users} change={11} variant="light" />
      </div>

      <div className="mt-6 rounded-2xl bg-card p-5 shadow-soft border border-border">
        <h3 className="font-display font-bold mb-4">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={dailySales}>
            <defs>
              <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--muted-foreground)" fontSize={12} />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
            <Area type="monotone" dataKey="sales" stroke="var(--accent)" strokeWidth={3} fill="url(#rev)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 rounded-2xl bg-card p-5 shadow-soft border border-border">
        <h3 className="font-display font-bold mb-4">Orders per Day</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={dailySales}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--muted-foreground)" fontSize={12} />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
            <Bar dataKey="orders" fill="var(--primary)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 rounded-2xl bg-card p-5 shadow-soft border border-border">
        <h3 className="font-display font-bold mb-1">Model Visualizations</h3>
        <p className="text-sm text-muted-foreground mb-4">Integrated backend plots for all four core model outputs.</p>
        <div className="grid gap-4 md:grid-cols-2">
          {visualizationItems.map((viz) => (
            <div key={viz.key} className="rounded-xl border border-border bg-background p-3">
              <h4 className="font-semibold text-sm text-foreground">{viz.title}</h4>
              <p className="text-xs text-muted-foreground mt-1 mb-2">{viz.description}</p>
              {hiddenVisualizations[viz.key] ? (
                <div className="h-48 rounded-lg border border-dashed border-border flex items-center justify-center text-xs text-muted-foreground text-center px-4">
                  Visualization unavailable. Confirm backend is running and `/api/visualizations/{viz.filename}` is reachable.
                </div>
              ) : (
                <img
                  src={viz.imageUrl}
                  alt={viz.title}
                  className="w-full h-48 object-contain rounded-lg bg-card"
                  loading="lazy"
                  onError={() => setHiddenVisualizations((prev) => ({ ...prev, [viz.key]: true }))}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
