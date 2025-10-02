import type React from "react"
import type { Metadata } from "next"

import Header from "@/components/header"

export const metadata: Metadata = {
  title: "Providing Dial Tone",
  description: "A nostalgic journey through memories captured in photos",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
    </>
  );
}
