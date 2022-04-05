import { FEATURE_TYPE } from 'lib/const'
import redis, { databaseName } from 'lib/redis'
import authenticate from 'lib/authenticate'

export default authenticate(async (req, res) => {
  try {
    if (req.user.sub !== process.env.NEXT_PUBLIC_AUTH0_ADMIN_ID) {
      throw new Error('Unauthorized')
    }

    const { title, createdAt, user, status } = req.body

    const FEATURE = { title, createdAt, user, status }

    const score = await redis.zscore(databaseName, JSON.stringify(FEATURE))
    console.log('score', score)

    const isRemove = await redis.zrem(databaseName, JSON.stringify(FEATURE))
    console.log('isRemove', isRemove)
    if (!isRemove) throw new Error('Failed to remove feature')

    await redis.zadd(
      databaseName,
      { nx: true },
      {
        score,
        member: JSON.stringify({
          ...FEATURE,
          status: FEATURE_TYPE.RELEASE
        })
      }
    )

    res.json({ body: 'success' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
