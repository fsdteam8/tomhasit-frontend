"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function VerifyEmailPage() {
  const router = useRouter()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [timer, setTimer] = useState(59)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

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

    // TODO: Replace with actual API call
    setTimeout(() => {
      router.push("/change-password")
    }, 1000)
  }

  const handleResend = () => {
    setTimer(59)
    // TODO: Call resend OTP API
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif font-semibold text-[#c7933b] mb-2">Verify Email</h1>
        <p className="text-[#667085] text-sm">Enter OTP to verify your email address</p>
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
              className={`w-14 h-14 text-center text-xl font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c7933b] ${
                digit ? "border-[#c7933b] text-[#c7933b]" : "border-[#d0d5dd] text-[#344054]"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 text-sm">
          <svg className="w-4 h-4 text-[#667085]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-[#667085]">00:{timer.toString().padStart(2, "0")}</span>
          <span className="text-[#667085] mx-2">Didn't get a code?</span>
          <button
            type="button"
            onClick={handleResend}
            disabled={timer > 0}
            className="text-[#c7933b] hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Resend
          </button>
        </div>

        <Button
          type="submit"
          disabled={isLoading || otp.some((digit) => !digit)}
          className="w-full h-12 bg-[#c7933b] hover:bg-[#b8842f] text-white font-medium"
        >
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
      </form>
    </div>
  )
}
