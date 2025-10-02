"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

export default function ChangePasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return "Password must be at least 8 characters"
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter"
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter"
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number"
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    // Validate password strength
    const passwordError = validatePassword(newPassword)
    if (passwordError) {
      setError(passwordError)
      return
    }

    setIsLoading(true)
    const accessToken = localStorage.getItem("otpAccessToken")
    try {
      // Get reset token from localStorage (stored during OTP verification)
      const resetToken = localStorage.getItem("resetToken")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
         newPassword
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password. Please try again.")
      }

      setSuccess(true)

      // Clear reset token
      localStorage.removeItem("resetToken")

      // Redirect to login after successful password change
      setTimeout(() => {
        router.push("/login?reset=success")
      }, 2000)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif font-semibold text-[#c7933b] mb-2">Change Password</h1>
        <p className="text-[#667085] text-sm">Create a new password for your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="newPassword" className="text-sm font-medium text-[#344054]">
            Create New Password
          </Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={isLoading || success}
              className="h-11 border-[#d0d5dd] focus:border-[#c7933b] focus:ring-[#c7933b] pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] hover:text-[#344054]"
              tabIndex={-1}
            >
              {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <p className="text-xs text-[#667085]">
            Must be at least 8 characters with uppercase, lowercase, and numbers
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-[#344054]">
            Confirm New Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading || success}
              className="h-11 border-[#d0d5dd] focus:border-[#c7933b] focus:ring-[#c7933b] pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] hover:text-[#344054]"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
            Password changed successfully! Redirecting to login...
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading || success}
          className="w-full h-12 bg-[#c7933b] hover:bg-[#b8842f] text-white font-medium disabled:opacity-50"
        >
          {isLoading ? "Changing..." : success ? "Success!" : "Change Password"}
        </Button>
      </form>
    </div>
  )
}