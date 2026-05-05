"use client";

import { motion } from "framer-motion";
import { Zap, Shield, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Valuation",
    description:
      "Get an accurate estimate in under 60 seconds with our smart pricing engine",
  },
  {
    icon: Shield,
    title: "Trusted Data",
    description:
      "Backed by market analysis across thousands of listings nationwide",
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description:
      "Understand what factors drive your car's value up or down",
  },
];

export default function Features() {
  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Why CarValue?
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-md mx-auto">
            A smarter way to understand your vehicle's market position
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-card rounded-2xl border border-border p-8 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/60 flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}