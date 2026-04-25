import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

interface Props {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: LucideIcon;
  change?: number;
  variant?: "navy" | "orange" | "light" | "success";
  delay?: number;
}

export function StatCard({ label, value, prefix, suffix, icon: Icon, change, variant = "light", delay = 0 }: Props) {
  const styles: Record<string, string> = {
    navy: "bg-gradient-navy text-white",
    orange: "bg-gradient-orange text-white",
    light: "bg-card text-foreground border border-border",
    success: "bg-success text-success-foreground",
  };
  const isDark = variant === "navy" || variant === "orange" || variant === "success";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className={`relative overflow-hidden rounded-2xl p-5 shadow-card ${styles[variant]}`}
    >
      {isDark && (
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      )}
      <div className="relative flex items-start justify-between">
        <div>
          <p className={`text-xs font-medium uppercase tracking-wider ${isDark ? "text-white/70" : "text-muted-foreground"}`}>{label}</p>
          <p className="mt-2 font-display text-3xl font-bold">
            <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
          </p>
          {change !== undefined && (
            <div className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${isDark ? "text-white/90" : change >= 0 ? "text-success" : "text-destructive"}`}>
              {change >= 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
              {change >= 0 ? "+" : ""}{change}% vs yesterday
            </div>
          )}
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${isDark ? "glass" : "bg-secondary"}`}>
          <Icon className={`h-5 w-5 ${isDark ? "text-white" : "text-primary"}`} />
        </div>
      </div>
    </motion.div>
  );
}
