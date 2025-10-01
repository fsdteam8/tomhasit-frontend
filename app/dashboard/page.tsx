"use client"

import { StatsCards } from "@/components/dashboard/stats-cards"
import { VisitorChart } from "@/components/dashboard/visitor-chart"
import { GalleryPreviewTable } from "@/components/dashboard/gallery-preview-table"
import { RecentCommentsTable } from "@/components/dashboard/recent-comments-table"

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-6">
      <StatsCards />
      <VisitorChart />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <GalleryPreviewTable />
        <RecentCommentsTable />
      </div>
    </div>
  )
}
