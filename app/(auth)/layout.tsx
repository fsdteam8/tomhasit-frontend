import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Authentication - Tomhasit",
  description: "Access your account",
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      <header className="p-6 md:p-8">
        <Link href="/" className="flex items-center gap-2">
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
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">{children}</main>
    </div>
  )
}
