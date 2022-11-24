import redis, { databaseName } from '@/lib/redis'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import { NextAuthOptions } from 'next-auth'
import { FeatureStatus } from '@/store/index'

export default async (req, res) => {
  const session = (await unstable_getServerSession(
    req,
    res,
    authOptions as NextAuthOptions
  )) as any

  try {
    if (session.user.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    const { title, createdAt, user, status } = req.body

    const FEATURE = { title, createdAt, user, status }

    const score = await redis.zscore(databaseName, JSON.stringify(FEATURE))

    const isRemove = await redis.zrem(databaseName, JSON.stringify(FEATURE))

    if (!isRemove) throw new Error('Failed to remove feature')

    await redis.zadd(
      databaseName,
      { nx: true },
      {
        score,
        member: JSON.stringify({
          ...FEATURE,
          status: FeatureStatus.Released
        })
      }
    )

    res.status(200).json({ body: 'success' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
