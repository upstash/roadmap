import { authenticate, redis } from './utils'
import { DB_NAME, FEATURE_TYPE } from '../../lib/const'

export default authenticate(async (req, res) => {
  const { score, title, createdAt, user, status } = req.body

  const key = JSON.stringify({ title, createdAt, user, status })
  if (!key) return res.status(400).json({ error: 'Invalid parameters' })

  if (req.user.sub !== process.env.NEXT_PUBLIC_AUTH0_ADMIN_ID) {
    return res.status(400).json({
      error: 'You can not publish'
    })
  }

  await redis.zrem(DB_NAME, key)
  await redis.zadd(
    'roadmap',
    'NX',
    score,
    JSON.stringify({ title, createdAt, user, status: FEATURE_TYPE.RELEASED })
  )

  res.json({ body: 'success' })
})
