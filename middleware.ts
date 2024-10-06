import { NextResponse } from 'next/server'
import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Your custom middleware logic here
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = { matcher: ["/api/auth/:path*"] }