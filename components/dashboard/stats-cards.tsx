"use client"

import { TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Visitor",
    value: "1,234",
    change: "+ 36% from the last month",
  },
  {
    title: "Total Comment",
    value: "1,234",
    change: "+ 36% from the last month",
  },
  {
    title: "Total User",
    value: "1,234",
    change: "+ 36% from the last month",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white rounded-lg border border-[#e6e7e6] p-6">
          <p className="text-sm font-medium text-[#667085] mb-2">{stat.title}</p>
          <p className="text-3xl font-semibold text-[#1a1a1a] mb-2">{stat.value}</p>
          <div className="flex items-center gap-1 text-sm text-[#c7933b]">
            <TrendingUp className="h-4 w-4" />
            <span>{stat.change}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
