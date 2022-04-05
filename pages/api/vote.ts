import redis, { databaseName } from 'lib/redis'
import authenticate from 'lib/authenticate'

export default authenticate(async (req, res) => {
  try {
    const { title, createdAt, user, status } = req.body

    const FEATURE = JSON.stringify({ title, createdAt, user, status })

    const hasUser = await redis.sadd('s:' + FEATURE, req.user.sub)

    console.log(hasUser)

    if (!hasUser) throw new Error('You have already voted')

    const data = await redis.zincrby(databaseName, 1, FEATURE)

    res.json(data)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
