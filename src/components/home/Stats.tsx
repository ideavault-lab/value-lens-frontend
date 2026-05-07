"use client";

import { motion } from "framer-motion";
import { Users, Award, Clock, CheckCircle } from "lucide-react";

const stats = [
  { number: "50,000+", label: "Cars Valued", icon: Users },
  { number: "98.7%", label: "Accuracy Rate", icon: Award },
  { number: "15s", label: "Average Time", icon: Clock },
  { number: "4.9/5", label: "User Rating", icon: CheckCircle },
];

export default function Stats() {
  return (
    <section className="py-16 border-t border-border bg-card/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-background/60 border border-border backdrop-blur-sm md:flex-col md:text-center md:items-center md:p-6 md:bg-transparent md:border-0 md:backdrop-blur-0"
            >
              {/* ICON */}
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 md:w-14 md:h-14 md:rounded-2xl md:mb-4">
                <stat.icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
              </div>

              {/* TEXT */}
              <div className="flex flex-col leading-tight md:items-center">
                <span className="text-2xl font-bold text-foreground md:text-4xl">
                  {stat.number}
                </span>
                <span className="text-xs text-muted-foreground md:text-sm md:mt-1">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}