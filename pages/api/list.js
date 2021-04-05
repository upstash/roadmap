import { getRedis } from './utils'

module.exports = async (req, res) => {
  let redis = getRedis()

  // for development
  // await redis.del('roadmap')

  let n = await redis.zrevrange('roadmap', 0, 100, 'WITHSCORES')
  let result = []

  for (let i = 0; i < n.length - 1; i += 2) {
    let item = {}
    const { title, createdAt, user } = JSON.parse(n[i])
    item['title'] = title
    item['user'] = user
    item['createdAt'] = createdAt
    item['score'] = n[i + 1]
    result.push(item)
  }

  redis.quit()

  res.json(result)
}
