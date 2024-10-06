import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import db from '@/lib/db'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { content, postId } = await req.json()

  try {
    const result = await db.query(
      'INSERT INTO comments(content, author_id, post_id) VALUES($1, $2, $3) RETURNING id',
      [content, session.user.id, postId]
    )
    return NextResponse.json({ id: result.rows[0].id })
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json({ error: 'Error creating comment' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const postId = searchParams.get('postId')

  if (!postId) {
    return NextResponse.json({ error: 'Post ID is required' }, { status: 400 })
  }

  try {
    const result = await db.query(`
      SELECT c.id, c.content, c.created_at,
             u.name as author_name, u.image as author_image
      FROM comments c
      JOIN users u ON c.author_id = u.id
      WHERE c.post_id = $1
      ORDER BY c.created_at DESC
    `, [postId])
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json({ error: 'Error fetching comments' }, { status: 500 })
  }
}