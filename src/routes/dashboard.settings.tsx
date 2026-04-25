import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/canteen/DashboardLayout";
import { useDashboardSnapshot } from "@/hooks/useDashboardSnapshot";

export const Route = createFileRoute("/dashboard/settings")({
  component: Settings,
});

function Settings() {
  const snapshot = useDashboardSnapshot();

  return (
    <DashboardLayout title="Settings" subtitle="Manage your canteen profile and preferences">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl bg-card p-6 shadow-soft border border-border">
          <h3 className="font-display font-bold mb-4">Canteen Profile</h3>
          <div className="space-y-3">
            <Field label="Canteen Name" value={snapshot.settings.canteenName} />
            <Field label="Owner" value={snapshot.settings.owner} />
            <Field label="Location" value={snapshot.settings.location} />
            <Field label="Operating Hours" value={snapshot.settings.operatingHours} />
          </div>
          <button className="mt-5 rounded-xl bg-gradient-orange px-5 py-2.5 text-sm font-semibold text-white shadow-glow">Save Changes</button>
        </div>
        <div className="rounded-2xl bg-gradient-navy p-6 text-white shadow-card relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative">
            <h3 className="font-display font-bold mb-2">Pro Plan</h3>
            <p className="text-sm text-white/70">Unlock unlimited AI predictions and waste tracking.</p>
            <p className="mt-6 font-display text-3xl font-bold">₹{snapshot.settings.planPrice}<span className="text-sm text-white/60">/mo</span></p>
            <button className="mt-4 w-full rounded-xl bg-accent py-2.5 text-sm font-semibold">Upgrade</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input defaultValue={value} className="mt-1.5 w-full rounded-xl bg-secondary px-4 py-2.5 text-sm outline-none focus:ring-2 ring-accent" />
    </div>
  );
}
