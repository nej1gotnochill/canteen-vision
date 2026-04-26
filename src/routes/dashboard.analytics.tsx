import { createFileRoute } from "@tanstack/react-router";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, LineChart, Line, ScatterChart, Scatter, ReferenceLine } from "recharts";
import { DashboardLayout } from "@/components/canteen/DashboardLayout";
import { StatCard } from "@/components/canteen/StatCard";
import { useDashboardSnapshot } from "@/hooks/useDashboardSnapshot";
import { IndianRupee, ShoppingBag, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/dashboard/analytics")({
  component: Analytics,
});

function Analytics() {
  const snapshot = useDashboardSnapshot();
  const dailySales = Array.isArray(snapshot.analytics?.dailySales) ? snapshot.analytics.dailySales : [];
  const weeklyRevenue = dailySales.reduce((total, point) => total + point.sales, 0);
  const totalOrders = dailySales.reduce((total, point) => total + point.orders, 0);
  const diagnostics = snapshot.modelDiagnostics ?? {
    actualVsPredicted: [],
    residuals: [],
    featureImportances: [],
  };
  const actualVsPredicted = Array.isArray(diagnostics.actualVsPredicted) ? diagnostics.actualVsPredicted : [];
  const residuals = Array.isArray(diagnostics.residuals) ? diagnostics.residuals : [];
  const featureImportances = (Array.isArray(diagnostics.featureImportances) ? diagnostics.featureImportances : [])
    .slice()
    .sort((left, right) => left.value - right.value);

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

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <ChartCard title="Sales Over Time" subtitle="Backend forecast trace">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={dailySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="sales" stroke="var(--accent)" strokeWidth={3} dot={{ r: 4, fill: "var(--accent)" }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Actual vs Predicted" subtitle="Hold-out test comparison">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={actualVsPredicted}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="actual" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="predicted" stroke="var(--accent)" strokeWidth={3} strokeDasharray="6 4" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Residual Diagnostics" subtitle="Prediction error spread">
          <ResponsiveContainer width="100%" height={260}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis type="number" dataKey="predicted" name="Predicted" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis type="number" dataKey="residual" name="Residual" stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <ReferenceLine y={0} stroke="var(--destructive)" strokeDasharray="6 4" />
              <Scatter data={residuals} fill="var(--accent)" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Feature Importances" subtitle="What drives the model">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={featureImportances} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis type="category" dataKey="name" stroke="var(--muted-foreground)" fontSize={12} width={110} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Bar dataKey="value" fill="var(--primary)" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </DashboardLayout>
  );
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-card p-5 shadow-soft border border-border"
    >
      <h3 className="font-display font-bold mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground mb-4">{subtitle}</p>
      {children}
    </motion.div>
  );
}
