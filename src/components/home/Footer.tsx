import { Car } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
            <Car className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="font-heading font-semibold text-sm text-foreground">
            CarValue
          </span>
        </div>

        {/* Center note (optional alignment improvement) */}
        <p className="text-xs text-muted-foreground text-center md:text-left">
          © 2026 CarValue. All estimates are approximate.
        </p>

      </div>
    </footer>
  );
}