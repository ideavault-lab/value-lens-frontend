"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-foreground rounded-3xl p-10 md:p-16 text-center flex flex-col items-center"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-background">
            Ready to find out?
          </h2>

          <p className="mt-4 text-background/70 text-lg max-w-md">
            It takes less than a minute. No signup required.
          </p>

          <Link href="/predict" className="mt-8">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-10 h-14 text-base font-semibold group"
            >
              Start Valuation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}