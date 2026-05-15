import type { Metadata } from "next";
import { IBM_Plex_Mono, Lora } from "next/font/google";
import { AppHeader } from "@/components/shared/AppHeader";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  style: ["italic", "normal"],
  variable: "--font-serif",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "HotelRwd — Let your cards fund the trip",
  description:
    "See every hotel your cards unlock — FHR, The Edit, Marriott certs, Capital One Premier — ranked in one view.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${ibmPlexMono.variable}`}>
      <body>
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
