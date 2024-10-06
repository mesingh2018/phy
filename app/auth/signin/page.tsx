import { getProviders } from "next-auth/react"
import SignIn from "@/components/SignIn"

export default async function SignInPage() {
  const providers = await getProviders()
  return <SignIn providers={providers} />
}