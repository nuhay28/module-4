import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campus Events",
  description: "Discover and manage campus events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}