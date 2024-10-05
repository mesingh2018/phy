"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  const { data: session } = useSession()
  const [userStats, setUserStats] = useState(null)

  useEffect(() => {
    if (session) {
      fetchUserStats()
    }
  }, [session])

  const fetchUserStats = async () => {
    const res = await fetch(`/api/users/${session.user.id}/stats`)
    const data = await res.json()
    setUserStats(data)
  }

  if (!session) {
    return <div>Please sign in to view your profile.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Profile</h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={session.user.image} />
                <AvatarFallback>{session.user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{session.user.name}</CardTitle>
                <CardDescription>{session.user.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {userStats && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-semibold">Posts</h3>
                  <p>{userStats.postCount}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Comments</h3>
                  <p>{userStats.commentCount}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Points</h3>
                  <p>{userStats.points}</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div>
              <h3 className="font-semibold mb-2">Badges</h3>
              <div className="flex flex-wrap gap-2">
                {userStats?.badges.map((badge) => (
                  <Badge key={badge.id} variant="secondary">{badge.name}</Badge>
                ))}
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}