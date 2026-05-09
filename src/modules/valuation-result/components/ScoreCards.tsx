"use client";

import { motion } from "framer-motion";

interface ScoreCardsProps {
  retentionScore: number;
  ownershipScore: number;
  demandIndex: number;
}

interface ScoreItemProps {
  score: number;
  label: string;
  sub: string;
  color: string;
  delay: number;
}

function ScoreItem({ score, label, sub, color, delay }: ScoreItemProps) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const fill = (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-card border border-border rounded-2xl px-4 py-4 flex items-center gap-4"
    >
      {/* Mini ring */}
      <div className="flex-shrink-0">
        <svg width="54" height="54" viewBox="0 0 54 54">
          <circle
            cx="27"
            cy="27"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-secondary"
          />
          <motion.circle
            cx="27"
            cy="27"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - fill }}
            transition={{ delay: delay + 0.3, duration: 1, ease: "easeOut" }}
            transform="rotate(-90 27 27)"
          />
          <text
            x="27"
            y="27"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="13"
            fontWeight="600"
            fill={color}
          >
            {score}
          </text>
        </svg>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground leading-tight">{label}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
      </div>
    </motion.div>
  );
}

export function ScoreCards({ retentionScore, ownershipScore, demandIndex }: ScoreCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
      <ScoreItem
        score={retentionScore}
        label="Value retention"
        sub="Long-term resale strength"
        color="#e86b1f"
        delay={0.1}
      />
      <ScoreItem
        score={ownershipScore}
        label="Ownership score"
        sub="Low maintenance · Fuel efficient"
        color="#16a34a"
        delay={0.2}
      />
      <ScoreItem
        score={demandIndex}
        label="Demand index"
        sub="Regional buyer interest"
        color="#1d4ed8"
        delay={0.3}
      />
    </div>
  );
}