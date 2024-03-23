import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  style: "normal",
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
});

export const metadata: Metadata = {
  title: "EAGER - Imagine",
  description: "Imagine is a simple image sharing platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      variables: {colorPrimary: "#5FBDFF"}// Set the primary color to gold
    }}>
      <html lang="en">
        <body className={cn("font-sans antialised", sans.variable)}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
