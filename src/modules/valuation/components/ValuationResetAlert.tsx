"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Check,
  Loader2,
  X,
} from "lucide-react";

interface Props {
  isOpen: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => Promise<void> | void;
}

export default function ValuationResetAlert({
  isOpen,
  title,
  description,
  onCancel,
  onConfirm,
}: Props) {

  const [isClearing, setIsClearing] =
    useState(false);

  const [isDone, setIsDone] =
    useState(false);

  const handleConfirm = async () => {

    if (isClearing)
      return;

    try {

      setIsClearing(true);

      await onConfirm();

      // smooth success transition
      setTimeout(() => {
        setIsDone(true);
      }, 450);

      // auto close
      setTimeout(() => {
        setIsDone(false);
        setIsClearing(false);
      }, 1300);

    } catch {

      setIsClearing(false);
      setIsDone(false);
    }
  };

  return (

    <AnimatePresence>

      {isOpen && (

        <motion.div
          initial={{
            opacity: 0,
            y: -8,
            height: 0,
          }}
          animate={{
            opacity: 1,
            y: 0,
            height: "auto",
          }}
          exit={{
            opacity: 0,
            y: -8,
            height: 0,
          }}
          transition={{
            duration: 0.22,
          }}
          className="overflow-hidden"
        >

          <motion.div
            animate={{
              borderColor: isDone
                ? "rgba(34,197,94,0.25)"
                : "rgba(245,158,11,0.18)",
            }}
            className={`
              relative
              mt-3
              overflow-hidden
              rounded-2xl
              border
              backdrop-blur-xl
            `}
          >

            {/* animated background */}
            <motion.div
              animate={{
                opacity: isDone ? 1 : 0,
              }}
              className="
                absolute
                inset-0
                bg-emerald-500/10
              "
            />

            <motion.div
              animate={{
                opacity: isDone ? 0 : 1,
              }}
              className="
                absolute
                inset-0
                bg-amber-500/[0.07]
              "
            />

            {/* glow */}
            <motion.div
              animate={{
                scale: isDone ? 1.15 : 1,
                opacity: isDone ? 0.8 : 0.4,
              }}
              className={`
                absolute
                -right-10
                -top-10
                h-28
                w-28
                rounded-full
                blur-3xl
                ${isDone
                  ? "bg-emerald-500/20"
                  : "bg-amber-500/20"
                }
              `}
            />

            <div className="relative flex items-center gap-3 p-3.5">

              {/* icon */}
              <motion.div
                animate={{
                  rotate: isDone ? 0 : [-6, 6, -6],
                  scale: isDone ? 1.05 : 1,
                }}
                transition={{
                  duration: 1.8,
                  repeat: isDone ? 0 : Infinity,
                }}
                className={`
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  ring-1
                  ${isDone
                    ? "bg-emerald-500/15 text-emerald-500 ring-emerald-500/20"
                    : "bg-amber-500/15 text-amber-500 ring-amber-500/20"
                  }
                `}
              >

                <AnimatePresence mode="wait">

                  {isClearing ? (

                    isDone ? (

                      <motion.div
                        key="done"
                        initial={{
                          scale: 0,
                          rotate: -40,
                        }}
                        animate={{
                          scale: 1,
                          rotate: 0,
                        }}
                        exit={{
                          scale: 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 15,
                        }}
                      >
                        <Check className="h-5 w-5" />
                      </motion.div>

                    ) : (

                      <motion.div
                        key="loading"
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                      >
                        <Loader2 className="h-5 w-5 animate-spin" />
                      </motion.div>

                    )

                  ) : (

                    <motion.div
                      key="warning"
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                      }}
                    >
                      <AlertTriangle className="h-5 w-5" />
                    </motion.div>

                  )}

                </AnimatePresence>

              </motion.div>

              {/* content */}
              <div className="min-w-0 flex-1">

                <motion.p
                  animate={{
                    color: isDone
                      ? "rgb(34 197 94)"
                      : "rgb(250 204 21)",
                  }}
                  className="
                    text-sm
                    font-semibold
                  "
                >
                  {isDone
                    ? "Selection Cleared"
                    : title
                  }
                </motion.p>

                <p
                  className="
                    mt-0.5
                    text-xs
                    leading-relaxed
                    text-muted-foreground
                  "
                >
                  {isDone
                    ? "Vehicle details refreshed successfully."
                    : description
                  }
                </p>

              </div>

              {/* actions */}
              {!isClearing && (

                <div className="flex items-center gap-2">

                  {/* cancel */}
                  <motion.button
                    whileTap={{
                      scale: 0.92,
                    }}
                    onClick={onCancel}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-border
                      bg-background/80
                      text-muted-foreground
                      transition-colors
                      hover:bg-muted
                      hover:text-foreground
                    "
                  >
                    <X className="h-4 w-4" />
                  </motion.button>

                  {/* confirm */}
                  <motion.button
                    whileHover={{
                      scale: 1.04,
                    }}
                    whileTap={{
                      scale: 0.92,
                    }}
                    onClick={handleConfirm}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      bg-primary
                      text-primary-foreground
                      shadow-lg
                      shadow-primary/20
                    "
                  >
                    <Check className="h-4 w-4" />
                  </motion.button>

                </div>
              )}

            </div>

            {/* progress line */}
            {isClearing && !isDone && (

              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: "100%",
                }}
                transition={{
                  duration: 0.9,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[2px]
                  bg-primary
                "
              />
            )}

          </motion.div>

        </motion.div>
      )}

    </AnimatePresence>
  );
}