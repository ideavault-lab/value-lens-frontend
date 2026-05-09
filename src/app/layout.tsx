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
  title: "Car Value Predictor",
  description: "Estimate your car's market value instantly",
};

/* ------------------ LAYOUT ------------------ */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full w-auto overflow-x-hidden antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        <div className="overflow-auto w-full height-full">
          <QueryProvider>
            {children}
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}