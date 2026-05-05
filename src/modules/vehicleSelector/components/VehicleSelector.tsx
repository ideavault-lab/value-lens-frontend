"use client";

import { Car, Bike, Truck, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";

interface VehicleOption {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
  popular?: boolean;
}

const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: "car",
    label: "Car",
    description: "Cars, SUVs, Sedans & Hatchbacks",
    icon: Car,
    enabled: true,
    popular: true,
  },
  {
    id: "bike",
    label: "Bike / Scooter",
    description: "Two-wheelers valuation coming soon",
    icon: Bike,
    enabled: false,
  },
  {
    id: "truck",
    label: "Truck & Commercial",
    description: "Heavy vehicles & commercial vehicles coming soon",
    icon: Truck,
    enabled: false,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.1, 0.25, 1]   // Proper cubic-bezier
    } 
  },
};

export default function VehicleSelector() {
  const router = useRouter();

  const handleSelect = (id: string, enabled: boolean) => {
    if (!enabled) return;
    router.push(`/predict/${id}`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8 md:py-12">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            INSTANT • ACCURATE • TRANSPARENT
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tighter text-foreground mb-4">
            Know the real value of your vehicle
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto">
            Get an honest, data-driven market price for your vehicle in seconds
          </p>
        </div>

        {/* Vehicle Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {VEHICLE_OPTIONS.map((item) => {
            const Icon = item.icon;
            const isEnabled = item.enabled;

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={isEnabled ? { scale: 1.03, y: -6 } : {}}
                whileTap={isEnabled ? { scale: 0.97 } : {}}
                onClick={() => handleSelect(item.id, isEnabled)}
                className={`
                  group relative rounded-3xl p-7 md:p-8 border flex flex-col h-full transition-all duration-300
                  ${isEnabled
                    ? "cursor-pointer bg-card hover:border-primary hover:shadow-xl hover:shadow-primary/10 border-border"
                    : "opacity-70 cursor-not-allowed bg-muted/40 border-border/60"
                  }
                `}
              >
                {/* Popular Badge */}
                {item.popular && (
                  <div className="absolute top-5 right-5 px-3.5 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full shadow">
                    Most Popular
                  </div>
                )}

                {/* Icon */}
                <div className="mb-8 flex justify-center">
                  <div className={`
                    w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center transition-all duration-300
                    ${isEnabled
                      ? "bg-primary/10 text-primary group-hover:bg-primary/15 group-hover:scale-110"
                      : "bg-muted text-muted-foreground"
                    }
                  `}>
                    <Icon size={48} strokeWidth={1.7} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-foreground">
                    {item.label}
                  </h3>
                  <p className="text-muted-foreground text-base md:text-[17px] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-8 pt-6 border-t border-border flex items-center justify-center">
                  {isEnabled ? (
                    <div className="flex items-center gap-2 text-primary font-medium text-base group-hover:gap-3 transition-all">
                      Check Market Price
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  ) : (
                    <div className="text-sm font-medium text-muted-foreground">
                      Coming Soon
                    </div>
                  )}
                </div>

                {/* Hover Glow */}
                {isEnabled && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Signals */}
        <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>🔒</span> 100% Private
          </div>
          <div>Real Market Data</div>
          <div>Used by 50,000+ Owners</div>
          <div>AI + Market Verified</div>
        </div>
      </div>
    </div>
  );
}