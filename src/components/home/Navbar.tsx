"use client";

import Link from "next/link";
import { Menu, X, ChevronDown, LogOut, User as UserIcon, Gauge } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/homeData";
import ThemeToggle from "../ui/ThemeToggle";
import { useCurrentUser } from "@/modules/auth/hooks/useAuth.hooks";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the account menu on outside click / Escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const { data: user } = useCurrentUser();

  return (
    <>
      {/* NAVBAR */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-[100]
          transition-all duration-300
          ${scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
          }
        `}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3 select-none">
            <img
              src="/value-lens.png"
              alt="ValueLens"
              className="h-9 w-9 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="leading-none">
              <h1 className="font-heading text-[1.4rem] font-semibold tracking-[-0.03em] text-foreground">
                Value<span className="text-primary">LENS</span>
              </h1>
              <p className="mt-1 text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
                Vehicle Intelligence
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground
                  after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary
                  after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* CTA */}
            <Link href="/valuation">
              <Button className="rounded-full px-5 py-2.5 gap-1.5">
                <Gauge className="h-4 w-4" />
                Value My Vehicle
              </Button>
            </Link>

            {/* divider */}
            <div className="mx-1 h-6 w-px bg-border" />

            {/* Theme toggle — kept square so it never competes visually with the round avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-lg  text-muted-foreground transition-colors hover:bg-secondary">
              <ThemeToggle />
            </div>

            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className={`
                    flex items-center gap-2 rounded-full border pl-1 pr-2.5 py-1
                    transition-colors
                    ${menuOpen
                      ? "border-primary/40 bg-primary/5"
                      : "border-border bg-secondary/40 hover:bg-secondary"
                    }
                  `}
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.fullName}
                      className="h-7 w-7 rounded-full object-cover ring-2 ring-background"
                    />
                  ) : (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground ring-2 ring-background">
                      {user.firstName.charAt(0)}
                    </div>
                  )}
                  <span className="max-w-[9ch] truncate text-sm font-medium text-foreground">
                    {user.firstName}
                  </span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${menuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-xl shadow-black/5"
                    >
                      <div className="flex items-center gap-3 px-2.5 py-2.5">
                        {user.avatarUrl ? (
                          <img
                            src={user.avatarUrl}
                            alt={user.fullName}
                            className="h-9 w-9 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                            {user.firstName.charAt(0)}
                          </div>
                        )}
                        <div className="min-w-0 leading-tight">
                          <p className="truncate text-sm font-medium text-foreground">
                            {user.fullName} bg-secondary/40
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <div className="my-1 h-px bg-border" />

                      <Link
                        href="/profile"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm text-foreground transition-colors hover:bg-muted"
                      >
                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                        Profile & account
                      </Link>

                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          // TODO: wire to your logout mutation / auth hook
                        }}
                        className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm text-destructive transition-colors hover:bg-destructive/10"
                      >
                        <LogOut className="h-4 w-4" />
                        Log out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/sign-in">
                <Button variant="outline" size="sm" className="rounded-full px-5">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary/40 md:hidden"
            aria-label="Toggle Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* SPACER */}
      <div className="h-16" />

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 right-0 bottom-0 z-[100] w-[80%] max-w-[320px] bg-background border-l border-border md:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b border-border px-4">
                <span className="font-heading text-sm font-semibold tracking-[-0.02em]">
                  Menu
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-1 p-4">
                {/* Signed-in summary at top, so identity isn't just a lone avatar */}
                {user && (
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="mb-2 flex items-center gap-3 rounded-2xl border border-border bg-secondary/40 p-3"
                  >
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.fullName}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                        {user.firstName.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0 leading-tight">
                      <p className="truncate text-sm font-medium text-foreground">
                        {user.fullName}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        View profile & account
                      </p>
                    </div>
                  </Link>
                )}

                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}

                <div className="mt-4 flex items-center justify-between rounded-xl border border-border p-3">
                  <span className="text-sm font-medium">Theme</span>
                  <ThemeToggle onClick={() => setOpen(false)} />
                </div>

                {!user && (
                  <Link href="/sign-in" onClick={() => setOpen(false)}>
                    <Button variant="outline" size="sm" className="mt-4 w-full rounded-full px-4">
                      Sign In
                    </Button>
                  </Link>
                )}

                <Link href="/valuation" onClick={() => setOpen(false)} className="mt-2">
                  <Button className="w-full rounded-xl gap-1.5">
                    <Gauge className="h-4 w-4" />
                    Value My Vehicle
                  </Button>
                </Link>

                {user && (
                  <button
                    onClick={() => {
                      setOpen(false);
                      // TODO: wire to your logout mutation / auth hook
                    }}
                    className="mt-3 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}