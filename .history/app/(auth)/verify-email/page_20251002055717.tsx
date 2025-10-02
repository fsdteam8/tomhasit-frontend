"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [timer, setTimer] = useState(59)
  const [error, setError] = useState("")
  const [resendLoading, setResendLoading] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return
    
    // Only allow numeric input
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError("")

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const otpCode = otp.join("")

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email,
          otp: otpCode 
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Invalid OTP. Please try again.")
      }

      // Store token or any response data if needed
      if (data.token) {
        localStorage.setItem("resetToken", data.token)
      }

      // Redirect to change password page
      router.push(`/change-password?email=${encodeURIComponent(email)}`)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed. Please try again.")
      // Clear OTP on error
      setOtp(["", "", "", "", "", ""])
      inputRefs.current[0]?.focus()
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    if (timer > 0) return
    
    setResendLoading(true)
    setError("")

    try {
      const response = await fetch("{{stavenar77}}/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend OTP. Please try again.")
      }

      setTimer(59)
      setOtp(["", "", "", "", "", ""])
      inputRefs.current[0]?.focus()
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend OTP. Please try again.")
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif font-semibold text-[#c7933b] mb-2">Verify Email</h1>
        <p className="text-[#667085] text-sm">Enter OTP sent to {email || "your email"}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-3 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              disabled={isLoading}
              className={`w-14 h-14 text-center text-xl font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c7933b] disabled:opacity-50 disabled:cursor-not-allowed ${
                digit ? "border-[#c7933b] text-[#c7933b]" : "border-[#d0d5dd] text-[#344054]"
              }`}
            />
          ))}
        </div>

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md text-center">
            {error}
          </div>
        )}

        <div className="flex items-center justify-center gap-2 text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#667085]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-[#667085]">00:{timer.toString().padStart(2, "0")}</span>
          </div>
          <span className="text-[#667085]">Didn't get a code?</span>
          <button
            type="button"
            onClick={handleResend}
            disabled={timer > 0 || resendLoading}
            className="text-[#c7933b] hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resendLoading ? "Sending..." : "Resend"}
          </button>
        </div>

        <Button
          type="submit"
          disabled={isLoading || otp.some((digit) => !digit)}
          className="w-full h-12 bg-[#c7933b] hover:bg-[#b8842f] text-white font-medium disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
      </form>
    </div>
  )
}