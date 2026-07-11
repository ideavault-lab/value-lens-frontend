import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";

import QueryProvider from "@/providers/query-provider";

/* ------------------ FONTS ------------------ */

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

/* ------------------ METADATA ------------------ */

export const metadata: Metadata = {
  metadataBase: new URL("https://valuelens.ai"),

  title: {
    default: "ValueLens • AI Vehicle Valuation",
    template: "%s • ValueLens",
  },

  description:
    "Get an instant AI-powered resale value estimate for your car. Compare market prices, understand depreciation, and make smarter buying or selling decisions with ValueLens.",

  applicationName: "ValueLens",

  keywords: [
    "car valuation",
    "vehicle valuation",
    "car resale value",
    "used car price",
    "car worth",
    "AI vehicle valuation",
    "ValueLens",
    "car estimator",
    "car price predictor",
    "India car valuation",
  ],

  authors: [
    {
      name: "ValueLens",
    },
  ],

  creator: "ValueLens",

  publisher: "ValueLens",

  category: "Automotive",

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/value-lens.png",
    shortcut: "/value-lens.png",
    apple: "/value-lens.png",
  },

  manifest: "/manifest.json",

  openGraph: {
    title: "ValueLens • AI Vehicle Valuation",

    description:
      "Know your vehicle's real market value using AI. Accurate resale estimates in seconds.",

    url: "https://valuelens.ai",

    siteName: "ValueLens",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ValueLens",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "ValueLens • AI Vehicle Valuation",

    description:
      "Estimate your vehicle's resale value instantly using AI.",

    images: ["/og-image.png"],
  },

  themeColor: "#E86417",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ValueLens",
  },
};

/* ------------------ LAYOUT ------------------ */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}