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

      <div>
        <div className="flex items-center gap-2 mb-3">

          <div
            className="
              h-9 w-9 rounded-xl
              bg-primary/10 text-primary
              flex items-center justify-center
            "
          >
            <ShieldCheck className="h-4 w-4" />
          </div>

          <div
            className="
              h-8 px-3 rounded-full
              border border-border
              bg-card
              text-[11px]
              font-medium
              text-muted-foreground
              flex items-center
            "
          >
            Vehicle Condition
          </div>
        </div>

        <h2
          className="
            text-2xl md:text-3xl
            font-heading
            font-semibold
            text-foreground
          "
        >
          What condition is your vehicle in?
        </h2>

        <p
          className="
            text-muted-foreground
            mt-2
            text-sm md:text-base
          "
        >
          Select the closest match for better valuation accuracy
        </p>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* CONDITION GRID                                                     */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-3
        "
      >

        {(CONDITIONS as ConditionItem[]).map((cond, i) => {

          const active =
            selectedCondition === cond.id;

          return (
            <motion.button
              key={cond.id}
              type="button"
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: i * 0.03,
                duration: 0.3,
              }}
              whileTap={{
                scale: 0.985,
              }}
              onClick={() =>
                handleSelectCondition(cond)
              }
              className={`
                relative
                flex items-start gap-3
                p-4
                rounded-xl
                border-2
                text-left
                transition-all
                duration-200

                hover:border-primary/40
                hover:bg-accent/30

                ${active
                  ? `
                      border-primary
                      bg-accent/50
                      shadow-sm
                    `
                  : `
                      border-border
                      bg-card
                    `
                }
              `}
            >

              {/* ICON */}
              <div
                className={`
                  h-11 w-11
                  rounded-lg
                  shrink-0
                  flex items-center justify-center
                  text-xl

                  ${active
                    ? "bg-muted"
                    : "bg-muted"
                  }
                `}
              >
                {cond.icon}
              </div>

              {/* CONTENT */}
              <div className="flex-1 min-w-0">

                <div className="flex items-center gap-2">

                  <h3
                    className="
                      text-sm sm:text-base
                      font-semibold
                      text-foreground
                      truncate
                    "
                  >
                    {cond.label}
                  </h3>

                </div>

                <p
                  className="
                    mt-1
                    text-xs sm:text-sm
                    text-muted-foreground
                    leading-relaxed
                    line-clamp-2
                  "
                >
                  {cond.description}
                </p>
              </div>

              {/* CHECK */}
              {active && (
                <motion.div
                  layoutId="condition-check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                  }}
                  className="
                    absolute
                    top-2 right-2
                    h-5 w-5
                    rounded-full
                    bg-primary
                    flex items-center justify-center
                  "
                >
                  <Check
                    className="
                      h-3 w-3
                      text-primary-foreground
                    "
                    strokeWidth={3}
                  />
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