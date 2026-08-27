import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "B2B Execution Kanban",
  description: "A lightweight execution board for the approved B2B plan.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
