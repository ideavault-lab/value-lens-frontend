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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div key={i} className="text-center">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-4xl font-bold">{stat.number}</div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}