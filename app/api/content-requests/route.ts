import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import db from '@/lib/db'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { title, description } = await req.json()

  try {
    const result = await db.query(
      'INSERT INTO content_requests(title, description, author_id) VALUES($1, $2, $3) RETURNING id',
      [title, description, session.user.id]
    )
    return NextResponse.json({ id: result.rows[0].id })
  } catch (error) {
    console.error('Error creating content request:', error)
    return NextResponse.json({ error: 'Error creating content request' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const result = await db.query(`
      SELECT cr.id, cr.title, cr.description, cr.votes, cr.created_at,
             u.name as author_name, u.image as author_image
      FROM content_requests cr
      JOIN users u ON cr.author_id = u.id
      ORDER BY cr.votes DESC
    `)
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching content requests:', error)
    return NextResponse.json({ error: 'Error fetching content requests' }, { status: 500 })
  }
}