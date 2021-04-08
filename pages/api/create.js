import { redis, authenticate } from '../../lib/utils'
import { string } from 'yup'
import { DB_NAME, FEATURE_TYPE } from '../../lib/const'

export default authenticate(async (req, res) => {
  const { title } = req.body

  let schema = string().required().trim().min(10).max(70)
  const isValid = await schema.isValid(title)
  if (!isValid)
    return res
      .status(400)
      .json({ error: 'Min 10 and Max 70 characters please.' })

  const { nickname, email, updated_at, ...user } = req.user
  const feature = {
    title,
    createdAt: Date.now(),
    user,
    status: FEATURE_TYPE.NEW
  }

  await redis.zadd(DB_NAME, 'NX', 1, JSON.stringify(feature))

  res.json({ body: 'success' })
})
