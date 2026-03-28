import { Metadata } from "next";
import GlobalHeader from "@/components/global-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "community.dog",
  description: "meep, meep.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: "",
  icons: {
    icon: "/ico/favicon.ico",
    apple: "/ico/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preload" as="font" href="/fonts/DM_Sans,Monofett/DM_Sans/DMSans-VariableFont_opsz,wght.ttf" type="font/ttf" />
      </head>
      <body>
        <GlobalHeader />
        <main style={{ flex: 1, margin: "0 auto", maxWidth: "960px" }}>{children}</main>
      </body>
    </html>
  );
}
