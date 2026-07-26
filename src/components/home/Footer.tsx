import { Car } from "lucide-react";

const LINKS = [
  { label: "Value my vehicle", href: "/valuation" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Vehicle types", href: "#vehicle-universe" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Car className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-foreground">
            Value<span className="text-primary">LENS</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} ValueLens. All estimates, no guesswork.</p>
      </div>
    </footer>
  );
}