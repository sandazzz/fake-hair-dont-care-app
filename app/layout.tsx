import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fake Hair Don't Care",
  description: "App for the donations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
