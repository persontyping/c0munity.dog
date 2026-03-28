import GlobalHeader from "@/components/global-header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GlobalHeader />
        <main style={{ flex: 1 }}>{children}</main>
      </body>
    </html>
  );
}
