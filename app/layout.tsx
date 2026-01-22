import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/elements/nav-bar";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HYDRATE PRO – Home",
    template: "HYDRATE PRO – %s",
  },
  description: "Test your knowledge",

  metadataBase: new URL("https://hydrate-blush.vercel.app/"), // change to your domain

  openGraph: {
    title: "HYDRATE PRO",
    description: "Test your knowledge",
    url: "https://hydrate-blush.vercel.app/",
    siteName: "HYDRATE PRO",
    images: [
      {
        url: "/og-image.png", // public/og-image.png
        width: 1200,
        height: 630,
        alt: "HYDRATE PRO",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "HYDRATE PRO",
    description: "Test your knowledge",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
	      <Providers>
          <Navbar />
          {children}
          <Toaster richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}
