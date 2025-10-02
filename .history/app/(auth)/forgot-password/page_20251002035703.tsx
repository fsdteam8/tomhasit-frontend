"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // TODO: Replace with actual API call
    setTimeout(() => {
      router.push("/verify-email")
    }, 1000)
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif font-semibold text-[#c7933b] mb-2">Forgot Password</h1>
        <p className="text-[#667085] text-sm">Enter your email to recover your password</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-[#344054]">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="hello@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11 border-[#d0d5dd] focus:border-[#c7933b] focus:ring-[#c7933b]"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-[#c7933b] hover:bg-[#b8842f] text-white font-medium"
        >
          {isLoading ? "Sending..." : "Send OTP"}
        </Button>
      </form>
    </div>
  )
}
