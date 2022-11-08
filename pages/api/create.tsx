import { string } from 'yup'
import { FEATURE_TYPE } from 'lib/const'
import redis, { databaseName } from 'lib/redis'
import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { NextAuthOptions } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = (await unstable_getServerSession(
    req,
    res,
    authOptions as NextAuthOptions
  )) as any

  try {
    const { title } = req.body

    let schema = string().required().trim().min(10).max(70)
    const isValid = await schema.isValid(title)

    if (!isValid) {
      throw new Error('Min 10 and Max 70 characters please.')
    }

    const newFeature = {
      title,
      createdAt: Date.now(),
      user: { name: session.user.name, id: session.user.id },
      status: FEATURE_TYPE.NEW
    }

    await redis.zadd(
      databaseName,
      { nx: true },
      { score: 0, member: JSON.stringify(newFeature) }
    )

    res.json({ body: 'success' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
