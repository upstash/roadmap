import { string } from 'yup'
import { FEATURE_TYPE } from 'lib/const'
import redis, { databaseName } from 'lib/redis'
import authenticate from 'lib/authenticate'

export default authenticate(async (req, res) => {
  try {
    const { title } = req.body

    let schema = string().required().trim().min(10).max(70)
    const isValid = await schema.isValid(title)

    if (!isValid) {
      throw new Error('Min 10 and Max 70 characters please.')
    }

    const { nickname, email, updated_at, ...user } = req.user

    const FEATURE = {
      title,
      createdAt: Date.now(),
      user,
      status: FEATURE_TYPE.NEW
    }

    await redis.zadd(
      databaseName,
      { nx: true },
      { score: 0, member: JSON.stringify(FEATURE) }
    )

    res.json({ body: 'success' })
  } catch (error) {
    res.status(400).json({ error })
  }
})
