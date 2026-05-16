"use client";

import React from "react";

import {
  TriangleAlert,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Props = {
  issues: string[];
  selectedIssues: string[];
  customIssue: string;
  setCustomIssue: React.Dispatch<
    React.SetStateAction<string>
  >;
  onToggleIssue: (issue: string) => void;
  onAddCustomIssue: () => void;
};

const ConditionIssues = ({
  issues,
  selectedIssues,
  customIssue,
  setCustomIssue,
  onToggleIssue,
  onAddCustomIssue,
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

      {/* -------------------------------------------------------------- */}
      {/* HEADER                                                         */}
      {/* -------------------------------------------------------------- */}

      <div className="flex gap-3">

        <div
          className="
            h-10 w-10
            shrink-0
            rounded-xl

            bg-amber-500/10
            text-amber-500

            flex items-center justify-center
          "
        >
          <TriangleAlert className="h-4 w-4" />
        </div>

        <div className="min-w-0">

          <h3
            className="
              text-sm sm:text-base
              font-semibold
              text-foreground
            "
          >
            Any visible issues?
          </h3>

          <p
            className="
              mt-1
              text-xs sm:text-sm
              text-muted-foreground
            "
          >
            Select all that apply
          </p>
        </div>
      </div>

      {/* -------------------------------------------------------------- */}
      {/* ISSUE TAGS                                                     */}
      {/* -------------------------------------------------------------- */}

      <div className="mt-5 flex flex-wrap gap-2">

        {issues.map((issue) => {

          const active =
            selectedIssues.includes(issue);

          return (
            <Button
              key={issue}
              type="button"
              size="sm"
              variant={
                active
                  ? "default"
                  : "outline"
              }
              onClick={() =>
                onToggleIssue(issue)
              }
              className={`
                rounded-xl
                px-3
                text-xs sm:text-sm
                transition-all

                ${
                  active
                    ? `
                      border-primary
                    `
                    : `
                      border-border
                      bg-background
                      text-muted-foreground

                      hover:border-primary/30
                      hover:text-foreground
                      hover:bg-accent/30
                    `
                }
              `}
            >
              {issue}
            </Button>
          );
        })}
      </div>

      {/* -------------------------------------------------------------- */}
      {/* CUSTOM ISSUE INPUT                                             */}
      {/* -------------------------------------------------------------- */}

      <div className="mt-5 flex gap-2">

        <Input
          type="text"
          value={customIssue}
          onChange={(e) =>
            setCustomIssue(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            onAddCustomIssue()
          }
          placeholder="Add custom issue..."
          className="
            h-11
            rounded-xl
          "
        />

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onAddCustomIssue}
          className="
            h-11 w-11
            shrink-0
            rounded-xl

            border-primary/20
            text-primary

            hover:bg-primary
            hover:text-primary-foreground
          "
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* -------------------------------------------------------------- */}
      {/* SELECTED ISSUES                                                */}
      {/* -------------------------------------------------------------- */}

      {selectedIssues.length > 0 && (

        <div
          className="
            mt-5
            flex flex-wrap gap-2
          "
        >

          {selectedIssues.map((issue) => (
            <div
              key={issue}
              className="
                rounded-lg
                border border-primary/10
                bg-primary/10

                px-2.5 py-1.5

                text-[11px]
                sm:text-xs

                font-medium
                text-primary
              "
            >
              {issue}
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default ConditionIssues;