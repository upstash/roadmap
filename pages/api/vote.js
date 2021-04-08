import { authenticate, redis } from './utils'
import { DB_NAME } from '../../lib/const'

export default authenticate(async (req, res) => {
  const { title, createdAt, user, status } = req.body

  const key = JSON.stringify({ title, createdAt, user, status })
  if (!key) return res.status(400).json({ error: 'Invalid parameters' })

  let c = await redis.sadd('s:' + key, req.user.sub)

  if (c === 0) {
    return res.json({
      error: 'You can not vote an item multiple times'
    })
  }

  let v = await redis.zincrby(DB_NAME, 1, key)

  res.json(v)
})
