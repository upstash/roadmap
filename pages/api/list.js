import groupby from 'lodash.groupby'
import { redis } from '../../lib/utils'
import { DB_NAME, FEATURE_TYPE } from '../../lib/const'

module.exports = async (req, res) => {
  // for development
  // await redis.del('roadmap')

  let n = await redis.zrevrange(DB_NAME, 0, 100, 'WITHSCORES')

  let result = []
  for (let i = 0; i < n.length - 1; i += 2) {
    let item = {}
    const { title, createdAt, user, status } = JSON.parse(n[i])
    item['title'] = title
    item['user'] = user
    item['createdAt'] = createdAt
    item['status'] = status
    item['score'] = n[i + 1]
    result.push(item)
  }

  const data = groupby(result, 'status')

  if (!data[FEATURE_TYPE.NEW]) {
    data[FEATURE_TYPE.NEW] = []
  }
  if (!data[FEATURE_TYPE.RELEASED]) {
    data[FEATURE_TYPE.RELEASED] = []
  }

  res.json(data)
}
