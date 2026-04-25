import { UtensilsCrossed } from "lucide-react";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-orange shadow-glow">
        <UtensilsCrossed className="h-5 w-5 text-white" strokeWidth={2.5} />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-display text-base font-bold ${light ? "text-white" : "text-foreground"}`}>
          Thapar<span className="text-accent">Canteen</span>
        </span>
        <span className={`text-[10px] font-medium tracking-widest ${light ? "text-white/60" : "text-muted-foreground"}`}>
          SALES OPTIMIZER
        </span>
      </div>
    </div>
  );
}
