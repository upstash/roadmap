import redis, { databaseName } from '@/lib/redis'
import { VoteType } from '@/store/index'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import { NextAuthOptions } from 'next-auth'

function defineScore(voteType: VoteType) {
  let score: number = 0

  switch (voteType) {
    case VoteType.UP:
      score = 1
      break
    case VoteType.DOWN:
      score = -1
      break
    default:
      throw new Error('Invalid vote type')
  }

  return score
}

export default async (req, res) => {
  const session = (await unstable_getServerSession(
    req,
    res,
    authOptions as NextAuthOptions
  )) as any

  try {
    const { title, createdAt, user, status, voteType } = req.body

    const FEATURE = JSON.stringify({ title, createdAt, user, status })

    const hasUser = await redis.sadd('s:' + FEATURE, session.user.id)

    if (!hasUser) throw new Error('You have already voted')

    const score = defineScore(voteType)

    const data = await redis.zincrby(databaseName, score, FEATURE)

    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
