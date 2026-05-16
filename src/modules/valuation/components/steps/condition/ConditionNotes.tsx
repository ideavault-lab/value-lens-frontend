"use client";

import React from "react";
import { FileText } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  max?: number;
};

const ConditionNotes = ({
  value,
  onChange,
  max = 500,
}: Props) => {
  return (
    <div
      className="
        rounded-2xl
        border border-border
        bg-card
        p-4 sm:p-5
      "
    >
      <div className="flex gap-3">

        <div
          className="
            h-10 w-10
            rounded-xl
            bg-primary/10
            text-primary
            shrink-0
            flex items-center justify-center
          "
        >
          <FileText className="h-4 w-4" />
        </div>

        <div>
          <h3
            className="
              text-sm sm:text-base
              font-semibold
              text-foreground
            "
          >
            Additional notes
          </h3>

          <p
            className="
              mt-1
              text-xs sm:text-sm
              text-muted-foreground
            "
          >
            Mention service history, repainting, accidents, etc.
          </p>
        </div>
      </div>

      <div className="mt-5">

        <textarea
          value={value}
          onChange={(e) =>
            onChange(
              e.target.value.slice(0, max)
            )
          }
          placeholder="
• Recently serviced
• New tyres installed
• Insurance active
          "
          className="
            min-h-[130px]
            w-full
            resize-none
            rounded-2xl
            border border-border
            bg-background
            px-4 py-4
            text-sm
            outline-none
            transition-all

            placeholder:text-muted-foreground/60

            focus:border-primary/30
            focus:ring-4
            focus:ring-primary/10
          "
        />

        <div
          className="
            mt-3
            flex items-center justify-between
          "
        >
          <p
            className="
              text-[11px]
              text-muted-foreground
            "
          >
            Optional but recommended
          </p>

          <p
            className="
              text-[11px]
              text-muted-foreground
            "
          >
            {value.length}/{max}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConditionNotes;