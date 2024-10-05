"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function CommunityPage() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState([])
  const [contentRequests, setContentRequests] = useState([])
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: '' })
  const [newContentRequest, setNewContentRequest] = useState({ title: '', description: '' })

  useEffect(() => {
    fetchPosts()
    fetchContentRequests()
  }, [])

  const fetchPosts = async () => {
    const res = await fetch('/api/posts')
    const data = await res.json()
    setPosts(data)
  }

  const fetchContentRequests = async () => {
    const res = await fetch('/api/content-requests')
    const data = await res.json()
    setContentRequests(data)
  }

  const handlePostSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newPost, tags: newPost.tags.split(',').map(tag => tag.trim()) }),
    })
    if (res.ok) {
      setNewPost({ title: '', content: '', tags: '' })
      fetchPosts()
    }
  }

  const handleContentRequestSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/content-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContentRequest),
    })
    if (res.ok) {
      setNewContentRequest({ title: '', description: '' })
      fetchContentRequests()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Community</h1>
      <Tabs defaultValue="posts" className="w-full">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="content-requests">Content Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          {session && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Create a New Post</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePostSubmit}>
                  <Input
                    placeholder="Title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="mb-4"
                  />
                  <Textarea
                    placeholder="Content"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    className="mb-4"
                  />
                  <Input
                    placeholder="Tags (comma-separated)"
                    value={newPost.tags}
                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                    className="mb-4"
                  />
                  <Button type="submit">Submit Post</Button>
                </form>
              </CardContent>
            </Card>
          )}
          <div className="space-y-6">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage src={post.author.image} />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{post.author.name}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{post.content}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag.id} variant="secondary">{tag.name}</Badge>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="content-requests">
          {session && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Request New Content</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContentRequestSubmit}>
                  <Input
                    placeholder="Title"
                    value={newContentRequest.title}
                    onChange={(e) => setNewContentRequest({ ...newContentRequest, title: e.target.value })}
                    className="mb-4"
                  />
                  <Textarea
                    placeholder="Description"
                    value={newContentRequest.description}
                    onChange={(e) => setNewContentRequest({ ...newContentRequest, description: e.target.value })}
                    className="mb-4"
                  />
                  <Button type="submit">Submit Request</Button>
                </form>
              </CardContent>
            </Card>
          )}
          <div className="space-y-6">
            {contentRequests.map((request) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{request.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage src={request.author.image} />
                          <AvatarFallback>{request.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{request.author.name}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{request.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Badge variant="secondary">Votes: {request.votes}</Badge>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}