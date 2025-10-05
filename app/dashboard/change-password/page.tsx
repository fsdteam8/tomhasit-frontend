import ChangePasswordForm from '@/components/dashboard/auth/change-password'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChangePasswordForm />
    </Suspense>
  )
}
