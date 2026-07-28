"use client";

import Link from "next/link";
import { Car, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/homeData";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* NAVBAR */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-[100]
          transition-all duration-300
          ${
            scrolled
              ? "bg-background/90 backdrop-blur-xl border-b border-border"
              : "bg-transparent"
          }
        `}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Car className="h-5 w-5 text-primary-foreground" />
            </div>

            <span className="font-heading text-xl font-bold whitespace-nowrap">
              Value<span className="text-primary">LENS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            <Link href="/sign-in">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full px-4"
              >
                Sign In
              </Button>
            </Link>

            <Link href="/valuation">
              <Button
                size="sm"
                className="rounded-full px-5"
              >
                Value My Vehicle
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
            aria-label="Toggle Menu"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      {/* SPACER */}
      <div className="h-16" />

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="
                fixed inset-0 z-[90]
                bg-black/50 backdrop-blur-sm
                md:hidden
              "
            />

            {/* MENU */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="
                fixed top-0 right-0 bottom-0
                z-[100]
                w-[80%] max-w-[320px]
                bg-background border-l border-border
                md:hidden
              "
            >
              <div className="flex h-16 items-center justify-between border-b border-border px-4">
                <span className="font-semibold">
                  Menu
                </span>

                <button onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-1 p-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="
                      rounded-xl px-4 py-3
                      text-sm font-medium
                      text-muted-foreground
                      hover:bg-muted
                      hover:text-foreground
                      transition-colors
                    "
                  >
                    {link.label}
                  </a>
                ))}

                <div className="mt-4 flex items-center justify-between rounded-xl border border-border p-3">
  <span className="text-sm font-medium">
    Theme
  </span>

  <ThemeToggle />
</div>

                <Link
                  href="/valuation"
                  onClick={() => setOpen(false)}
                  className="mt-4"
                >
                  <Button className="w-full rounded-xl">
                    Value My Vehicle
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}