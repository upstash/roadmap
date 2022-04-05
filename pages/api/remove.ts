import redis, { databaseName } from 'lib/redis'
import authenticate from 'lib/authenticate'

export default authenticate(async (req, res) => {
  try {
    if (req.user.sub !== process.env.NEXT_PUBLIC_AUTH0_ADMIN_ID) {
      throw new Error('Unauthorized')
    }

    const { title, createdAt, user, status } = req.body
    const FEATURE = JSON.stringify({ title, createdAt, user, status })

    console.log()

    const isRemove = await redis.zrem(databaseName, FEATURE)

    if (!isRemove) {
      throw new Error('Feature not found')
    }

    res.json({ body: 'success' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
