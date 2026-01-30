import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Refactor Sprint | 25 Years of Strategy. Compressed into 72 Hours.",
  description: "We apply senior architectural rigor to an algorithmic tech stack to debug your revenue engine. The speed of AI. The rigor of an Architect.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        
        {/* HubSpot Tracking Code */}
        <Script
          id="hs-script-loader"
          src="//js-na2.hs-scripts.com/244506871.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
