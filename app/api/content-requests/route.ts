import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const contentRequests = await prisma.contentRequest.findMany({
      include: {
        author: true,
      },
      orderBy: {
        votes: 'desc',
      },
    })
    return NextResponse.json(contentRequests)
  } catch (error) {
    console.error('Error fetching content requests:', error)
    return NextResponse.json({ error: 'Error fetching content requests' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { title, description } = await req.json()
    const contentRequest = await prisma.contentRequest.create({
      data: {
        title,
        description,
        author: { connect: { id: session.user.id } },
      },
    })
    return NextResponse.json(contentRequest)
  } catch (error) {
    console.error('Error creating content request:', error)
    return NextResponse.json({ error: 'Error creating content request' }, { status: 500 })
  }
}