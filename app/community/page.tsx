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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function CommunityPage() {
  const { data: session, status } = useSession()
  const [posts, setPosts] = useState([])
  const [contentRequests, setContentRequests] = useState([])

  useEffect(() => {
    if (status === "authenticated") {
      fetchPosts()
      fetchContentRequests()
    }
  }, [status])

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
    // Handle post submission
  }

  const handleContentRequestSubmit = async (e) => {
    e.preventDefault()
    // Handle content request submission
  }

  if (status === "loading") {
    return <div>Loading...</div>
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
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mb-4">Create New Post</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a New Post</DialogTitle>
                  <DialogDescription>Share your thoughts with the community</DialogDescription>
                </DialogHeader>
                <form onSubmit={handlePostSubmit}>
                  {/* Add form fields here */}
                </form>
              </DialogContent>
            </Dialog>
          )}
          {/* Display posts here */}
        </TabsContent>
        <TabsContent value="content-requests">
          {session && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mb-4">Request New Content</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request New Content</DialogTitle>
                  <DialogDescription>Let us know what content you'd like to see</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleContentRequestSubmit}>
                  {/* Add form fields here */}
                </form>
              </DialogContent>
            </Dialog>
          )}
          {/* Display content requests here */}
        </TabsContent>
      </Tabs>
    </div>
  )
}