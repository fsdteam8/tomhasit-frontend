import type React from "react"
import type { Metadata } from "next"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { SessionProvider } from "@/providers/session-provider"
import { QueryProvider } from "@/providers/query-provider"

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
    <SessionProvider>
      <QueryProvider>
        <div className="flex h-screen bg-[#f9fafb]">
          <DashboardSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </QueryProvider>
    </SessionProvider>
  );
}
