"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Check,
  ShieldCheck,
} from "lucide-react";

import { CONDITIONS } from "@/lib/carData";
import ConditionNotes from "./condition/ConditionNotes";
import ConditionIssues from "./condition/ConditionIssues";
import { useValuation } from "../../context/valuation.context";
import StepHeader from "./StepHeader";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type ConditionId = string;

type ConditionItem = {
  id: ConditionId;
  label: string;
  description: string;
  icon: React.ReactNode;
};

const COMMON_ISSUES = [
  "Minor scratches",
  "Dent on body",
  "Paint fade",
  "Worn tyres",
  "Seat damage",
  "Engine noise",
  "AC issue",
  "Battery weak",
  "Service due",
  "Rust visible",
  "No issues",
];

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

const StepCondition = () => {
  const {
    data,
    updateForm,
  } = useValuation();

  /* ---------------------------------------------------------------------- */
  /*                               FORM VALUES                              */
  /* ---------------------------------------------------------------------- */

  const selectedCondition =
    data.form.condition?.id || null;

  const selectedIssues =
    data.form.conditionIssues;

  const notes =
    data.form.conditionNotes;

  /* ---------------------------------------------------------------------- */
  /*                             LOCAL INPUT STATE                          */
  /* ---------------------------------------------------------------------- */

  const [customIssue, setCustomIssue] =
    React.useState("");

  /* ---------------------------------------------------------------------- */
  /*                              SELECT CONDITION                           */
  /* ---------------------------------------------------------------------- */

  const handleSelectCondition = (
    condition: ConditionItem
  ) => {

    updateForm("condition", {
      id: condition.id,
      name: condition.label,
    });
  };

  /* ---------------------------------------------------------------------- */
  /*                              TOGGLE ISSUE                              */
  /* ---------------------------------------------------------------------- */

  const toggleIssue = (
    issue: string
  ) => {

    const exists =
      selectedIssues.includes(issue);

    const updatedIssues =
      exists
        ? selectedIssues.filter(
          (i) => i !== issue
        )
        : [...selectedIssues, issue];

    updateForm(
      "conditionIssues",
      updatedIssues
    );
  };

  /* ---------------------------------------------------------------------- */
  /*                            ADD CUSTOM ISSUE                            */
  /* ---------------------------------------------------------------------- */

  const addCustomIssue = () => {

    const value =
      customIssue.trim();

    if (!value) return;

    if (
      !selectedIssues.includes(value)
    ) {

      updateForm(
        "conditionIssues",
        [...selectedIssues, value]
      );
    }

    setCustomIssue("");
  };

  /* ---------------------------------------------------------------------- */
  /*                                  UI                                    */
  /* ---------------------------------------------------------------------- */


  return (
    <div className="space-y-6 p-2 pb-10">

      {/* ------------------------------------------------------------------ */}
      {/* HEADER                                                             */}
      {/* ------------------------------------------------------------------ */}

      <StepHeader
        title="What condition is your vehicle in?"
        description="Select the closest match for better valuation accuracy"
      />
      {/* ------------------------------------------------------------------ */}
      {/* CONDITION GRID                                                     */}
      {/* ------------------------------------------------------------------ */}

      {/* CONDITION CARDS - Improved Layout */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CONDITIONS.map((cond, i) => {
          const active = selectedCondition === cond.id;

          return (
            <motion.button
              key={cond.id}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => handleSelectCondition(cond)}
              className={`
                group relative flex h-full min-h-[110px] items-start gap-4 
                rounded-2xl border-2 p-4 text-left transition-all duration-200
                hover:border-primary/40 hover:bg-accent/30
                ${active
                  ? "border-primary bg-accent/50 shadow-sm"
                  : "border-border bg-card"
                }
              `}
            >
              {/* Icon */}
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl transition-all
                  ${active ? "bg-white" : "bg-white/0 group-hover:bg-muted/70"}`}
              >
                {cond.icon}
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {cond.label}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {cond.description}
                </p>
              </div>

              {/* Checkmark */}
              {active && (
                <motion.div
                  layoutId="condition-check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                  className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary"
                >
                  <Check className="h-4 w-4 text-primary-foreground" strokeWidth={3} />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* ISSUE TAGS                                                         */}
      {/* ------------------------------------------------------------------ */}
      {/* Issues */}
      <ConditionIssues
        issues={COMMON_ISSUES}
        selectedIssues={selectedIssues}
        customIssue={customIssue}
        setCustomIssue={setCustomIssue}
        onToggleIssue={toggleIssue}
        onAddCustomIssue={addCustomIssue}
      />

      {/* Notes */}
      <ConditionNotes
        value={notes}
        onChange={(value) =>
          updateForm(
            "conditionNotes",
            value
          )
        }
      />
    </div>
  );
};

export default StepCondition;