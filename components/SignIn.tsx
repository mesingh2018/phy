"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function SignIn({ providers }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Sign In</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <Button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </Button>
        </div>
      ))}
    </div>
  )
}