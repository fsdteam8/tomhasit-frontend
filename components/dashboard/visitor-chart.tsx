"use client"

import { useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { cn } from "@/lib/utils"

const data = [
  { month: "Feb", value1: 4000, value2: 2400 },
  { month: "Mar", value1: 3000, value2: 1398 },
  { month: "Apr", value1: 12345, value2: 9800 },
  { month: "May", value1: 2780, value2: 3908 },
  { month: "Jun", value1: 1890, value2: 4800 },
  { month: "Jul", value1: 2390, value2: 3800 },
  { month: "Aug", value1: 3490, value2: 4300 },
  { month: "Sep", value1: 4000, value2: 2400 },
  { month: "Oct", value1: 5000, value2: 4800 },
  { month: "Nov", value1: 6000, value2: 5200 },
  { month: "Dec", value1: 7000, value2: 6000 },
  { month: "Jan", value1: 8000, value2: 7200 },
]

const periods = [
  { label: "12 Months", value: "12m" },
  { label: "6 Months", value: "6m" },
  { label: "30 Days", value: "30d" },
  { label: "7 Days", value: "7d" },
]

export function VisitorChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("12m")

  return (
    <div className="bg-white rounded-lg border border-[#e6e7e6] p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-[#1a1a1a]">Visitor Report</h2>
        <div className="flex gap-2">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                selectedPeriod === period.value
                  ? "bg-[#c7933b] text-white"
                  : "bg-white text-[#667085] border border-[#e6e7e6] hover:bg-[#f9f4eb]",
              )}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#667085" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#667085" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-3 rounded-lg shadow-lg border border-[#e6e7e6]">
                    <p className="text-sm font-medium text-[#1a1a1a] mb-1">{payload[0].payload.month} 2021</p>
                    <p className="text-lg font-semibold text-[#c7933b]">{payload[0].value}</p>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="value1"
            stroke="#c7933b"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "#c7933b" }}
          />
          <Line type="monotone" dataKey="value2" stroke="#e6e7e6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
