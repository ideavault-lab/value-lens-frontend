import { Car } from "lucide-react";

export default // ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-border py-10 bg-card/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Car className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-lg text-foreground">
                Value<span className="text-primary">LENS</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              AI-powered resale valuations for every vehicle type.
            </p>
          </div>

          {[
            { title: "Product",  links: ["How It Works", "Vehicle Types", "Market Insights", "API Access"] },
            { title: "Vehicles", links: ["Cars & SUVs", "Motorcycles", "Trucks", "Buses & Vans"] },
            { title: "Company",  links: ["About", "Blog", "Privacy Policy", "Terms"] },
          ].map(col => (
            <div key={col.title}>
              <p className="text-foreground font-semibold text-sm mb-3">{col.title}</p>
              <div className="space-y-2">
                {col.links.map(l => (
                  <a key={l} href="#"
                    className="block text-muted-foreground hover:text-foreground text-sm transition-colors">{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-muted-foreground text-xs">© 2026 VehicleVal. All estimates are market approximations.</p>
          <p className="text-muted-foreground text-xs">Made with care in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}