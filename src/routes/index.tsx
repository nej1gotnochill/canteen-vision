import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Leaf, Package, LineChart, Sparkles, Star, Zap, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/canteen/Logo";
import { testimonials } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ThaparCanteenSalesOptimizer — AI for Campus Canteens" },
      { name: "description", content: "Forecast demand, cut waste, and grow revenue across Thapar University canteens with AI-powered insights." },
      { property: "og:title", content: "ThaparCanteenSalesOptimizer" },
      { property: "og:description", content: "AI-powered sales optimization for Thapar University canteens." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Brain, title: "Demand Forecasting", desc: "Predict tomorrow's Maggi rush before students even wake up.", color: "bg-gradient-navy text-white" },
  { icon: Leaf, title: "Waste Reduction", desc: "Cut food waste by up to 40% with AI consumption tracking.", color: "bg-gradient-orange text-white" },
  { icon: Package, title: "Smart Inventory", desc: "Auto-reorder Patties, Cold Coffee & more, exactly when needed.", color: "bg-card text-foreground" },
  { icon: LineChart, title: "Revenue Insights", desc: "Hourly heatmaps reveal hidden goldmines in your menu.", color: "bg-card text-foreground" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 lg:px-8 py-4">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">Features</a>
            <a href="#testimonials" className="hover:text-foreground transition">Vendors</a>
            <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
          </nav>
          <Link to="/dashboard" className="inline-flex items-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary-glow transition">
            Open Dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-[0.06]" />
        <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute top-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 lg:px-8 pt-16 lg:pt-28 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent ring-1 ring-accent/20">
              <Sparkles className="h-3.5 w-3.5" /> Built for Thapar University Canteens
            </div>
            <h1 className="mt-6 font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground text-balance leading-[1.05]">
              Optimize Your <span className="bg-gradient-orange bg-clip-text text-transparent">Canteen Sales</span> with AI
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Forecast Maggi rush hours, cut food waste, manage inventory, and grow revenue — all from one beautifully simple dashboard tuned for campus canteens.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-2xl bg-gradient-orange px-6 py-3.5 text-sm font-semibold text-white shadow-glow hover:scale-[1.02] transition">
                View Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary-glow transition">
                Start Free Trial <Zap className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-success" /> Used by 12+ campus canteens</div>
              <div className="flex items-center gap-2"><Star className="h-4 w-4 text-accent fill-accent" /> 4.9 / 5 vendor rating</div>
            </div>
          </motion.div>

          {/* Floating dashboard preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              { label: "Today's Revenue", value: "₹18,420", sub: "+12% vs yday", cls: "bg-gradient-navy text-white" },
              { label: "Orders Today", value: "245", sub: "Peak: 12–1 PM", cls: "bg-gradient-orange text-white" },
              { label: "Waste Saved", value: "8.4 kg", sub: "This week", cls: "bg-card text-foreground" },
            ].map((s, i) => (
              <motion.div key={i} whileHover={{ y: -6 }} className={`relative overflow-hidden rounded-2xl p-6 shadow-card ${s.cls}`}>
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
                <p className="text-xs font-medium uppercase tracking-wider opacity-70">{s.label}</p>
                <p className="mt-2 font-display text-3xl font-bold">{s.value}</p>
                <p className="mt-1 text-sm opacity-80">{s.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 lg:px-8 py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Why ThaparCanteen</p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold text-balance">Everything your canteen needs, in one tap.</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className={`relative overflow-hidden rounded-2xl p-6 shadow-soft ${f.color}`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl glass">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-sm opacity-80">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Loved by Thapar vendors</p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">Real results across campus.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-card p-6 shadow-soft"
              >
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-accent" />)}
                </div>
                <p className="mt-4 text-foreground">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-navy text-sm font-bold text-white">{t.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 lg:px-8 py-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 lg:p-16 text-white shadow-card">
          <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-balance">Ready to make your canteen smarter?</h2>
            <p className="mt-4 text-white/80">Join Thapar's leading canteens already growing with AI. Free for the first 30 days.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-2xl bg-white text-primary px-6 py-3.5 text-sm font-semibold hover:scale-[1.02] transition">
                Open Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="inline-flex items-center gap-2 rounded-2xl glass text-white px-6 py-3.5 text-sm font-semibold hover:bg-white/10 transition">
                Talk to founder
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo />
          <p className="text-sm text-muted-foreground">© 2025 ThaparCanteenSalesOptimizer. Made with 🍜 at Thapar University.</p>
        </div>
      </footer>
    </div>
  );
}
