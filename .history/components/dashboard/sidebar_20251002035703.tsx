"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { LayoutDashboard, ImageIcon, MessageSquare, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Gallery",
    href: "/dashboard/gallery",
    icon: ImageIcon,
  },
  {
    name: "Got Dial Tone",
    href: "/dashboard/got-dial-tone",
    icon: MessageSquare,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" })
  }

  return (
    <aside className="w-[235px] bg-white border-r border-[#e6e7e6] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#e6e7e6]">
        <Link href="/dashboard" className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 24L16 8L24 24M12 20H20"
              stroke="#c7933b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-2xl font-serif font-semibold text-[#c7933b]">Tomhasit</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive ? "bg-[#c7933b] text-white" : "text-[#667085] hover:bg-[#f9f4eb] hover:text-[#c7933b]",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#e6e7e6]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Log out
        </button>
      </div>
    </aside>
  )
}
