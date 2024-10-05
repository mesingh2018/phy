import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import db from '@/lib/db'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { title, content, tags } = await req.json()

  try {
    const result = await db.query(
      'INSERT INTO posts(title, content, author_id) VALUES($1, $2, $3) RETURNING id',
      [title, content, session.user.id]
    )
    const postId = result.rows[0].id

    for (const tag of tags) {
      await db.query(
        'INSERT INTO tags(name) VALUES($1) ON CONFLICT (name) DO NOTHING',
        [tag]
      )
      await db.query(
        'INSERT INTO post_tags(post_id, tag_name) VALUES($1, $2)',
        [postId, tag]
      )
    }

    return NextResponse.json({ id: postId })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const tag = searchParams.get('tag')

  try {
    let query = `
      SELECT p.id, p.title, p.content, p.created_at, 
             u.name as author_name, u.image as author_image,
             array_agg(t.name) as tags
      FROM posts p
      JOIN users u ON p.author_id = u.id
      LEFT JOIN post_tags pt ON p.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_name = t.name
    `
    const params = []
    if (tag) {
      query += ' WHERE t.name = $1'
      params.push(tag)
    }
    query += `
      GROUP BY p.id, u.name, u.image
      ORDER BY p.created_at DESC
    `

    const result = await db.query(query, params)
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 })
  }
}