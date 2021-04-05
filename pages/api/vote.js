import { authenticate, getRedis } from './utils'

export default authenticate(async (req, res) => {
  const { title, createdAt, user } = req.body

  const key = JSON.stringify({ title, createdAt, user })
  if (!key) return res.status(400).json({ error: 'Invalid parameters' })

  let redis = getRedis()

  let c = await redis.sadd('s:' + key, req.user.sub)

  if (c === 0) {
    redis.quit()
    return res.json({
      error: 'You can not vote an item multiple times'
    })
  }

  let v = await redis.zincrby('roadmap', 1, key)
  redis.quit()
  res.json(v)
})
