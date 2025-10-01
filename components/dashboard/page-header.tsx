import type React from "react"

interface PageHeaderProps {
  title: string
  action?: React.ReactNode
}

export function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <div className="bg-white border-b border-[#e6e7e6] px-8 py-6 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-[#1a1a1a]">{title}</h1>
      {action}
    </div>
  )
}
