"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-background to-background" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 md:pt-32 md:pb-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-2xl"
        >
          {/* TOP BADGES */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/60 rounded-full border border-accent mb-6">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span className="text-xs font-medium text-accent-foreground">
              Trusted by 50,000+ car owners
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/80 mb-6 ml-5">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              AI-Powered • Real Market Data
            </span>
          </div>

          {/* TITLE */}
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground leading-tight">
            Know your car's
            <span className="text-primary block">true worth</span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
            Get an instant, data-driven estimate of your car's resale value.
            No guesswork, no dealer bias — just honest numbers.
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/predict">
              <Button size="lg" className="rounded-xl px-8 h-14 group">
                Value My Car
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              className="rounded-xl px-8 h-14"
            >
              How It Works
            </Button>
          </div>

          {/* SOCIAL PROOF */}
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-accent border-2 border-background flex items-center justify-center text-xs font-semibold text-accent-foreground"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-chart-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                4.8/5 from 2,400+ ratings
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}