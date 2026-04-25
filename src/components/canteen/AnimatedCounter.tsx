import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export function AnimatedCounter({ value, prefix = "", suffix = "", decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);
  useEffect(() => {
    const controls = animate(count, value, { duration: 1.4, ease: "easeOut" });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => { controls.stop(); unsub(); };
  }, [value]);
  return <motion.span>{display}</motion.span>;
}
