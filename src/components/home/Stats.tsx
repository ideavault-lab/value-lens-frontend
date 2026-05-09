"use client";

import { motion } from "framer-motion";
import { Users, Award, Clock, CheckCircle, Star } from "lucide-react";

export default 
// ─── STATS ────────────────────────────────────────────────────────────────────

function Stats() {
  const items = [
    { Icon: Users,        number: "50,000+", label: "Vehicles Valued" },
    { Icon: CheckCircle,  number: "98.7%",   label: "Accuracy Rate"   },
    { Icon: Clock,        number: "15s",     label: "Average Time"    },
    { Icon: Star,         number: "4.9/5",   label: "User Rating"     },
  ];
  return (
    <section className="border-y border-border bg-card/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:divide-x divide-border">
          {items.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-2 px-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <s.Icon className="w-5 h-5 text-primary" />
              </div>
              <span className="font-heading font-bold text-3xl text-foreground">{s.number}</span>
              <span className="text-xs text-muted-foreground font-medium">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}