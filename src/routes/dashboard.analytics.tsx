import { createFileRoute } from "@tanstack/react-router";
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
    </DashboardLayout>
  );
}
