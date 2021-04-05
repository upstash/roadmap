import { getRedis, authenticate } from './utils'
import { string } from 'yup'

export default authenticate(async (req, res) => {
  const { title } = req.body

  let schema = string().required().trim().min(10).max(70)
  const isValid = await schema.isValid(title)
  if (!isValid)
    return res
      .status(400)
      .json({ error: 'Min 10 and Max 70 characters please.' })

  let redis = getRedis()

  const { nickname, email, updated_at, ...user } = req.user

  await redis.zadd(
    'roadmap',
    'NX',
    1,
    JSON.stringify({ title, createdAt: Date.now(), user })
  )
  redis.quit()

  res.json({
    body: 'success'
  })
})
