import VerifyEmailPage from '@/components/dashboard/auth/verify-email'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailPage />
    </Suspense>
  )
}
