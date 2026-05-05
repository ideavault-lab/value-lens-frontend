import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Insight } from "./types";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface InsightBadgeProps {
  /** Pass null to hide the badge. */
  insight: Insight | null;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function InsightBadge({ insight }: InsightBadgeProps): React.ReactElement {
  return (
    <AnimatePresence>
      {insight && (
        <motion.div
          key={insight.icon}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-start gap-3 p-4 rounded-xl bg-accent/30 border border-accent overflow-hidden"
        >
          <span className="text-lg leading-none mt-0.5">{insight.icon}</span>
          <p className="text-sm text-accent-foreground">{insight.text}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}