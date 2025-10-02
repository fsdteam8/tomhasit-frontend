import type React from "react"
import type { Metadata } from "next"

import Header from "@/components/header"

export const metadata: Metadata = {
  title: "Dashboard - Tomhasit",
  description: "Manage your content",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <>
      <Header />
        <main className="min-h-screen flex">
            {children}
        </main>
   </>
  );
}
