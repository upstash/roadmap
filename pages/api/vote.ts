import redis, { databaseName } from '@/lib/redis'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import { NextAuthOptions } from 'next-auth'

export default async (req, res) => {
  const session = (await unstable_getServerSession(
    req,
    res,
    authOptions as NextAuthOptions
  )) as any

  try {
    const { title, createdAt, user, status } = req.body

    const FEATURE = JSON.stringify({ title, createdAt, user, status })

    const hasUser = await redis.sadd('s:' + FEATURE, session.user.id)

    if (!hasUser) throw new Error('You have already voted')

    const data = await redis.zincrby(databaseName, 1, FEATURE)

    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
