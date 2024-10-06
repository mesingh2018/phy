"use client"

import { useSearchParams } from 'next/navigation'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Authentication Error</h1>
      <p>An error occurred during authentication: {error}</p>
      <p>Please try again or contact support if the problem persists.</p>
    </div>
  )
}