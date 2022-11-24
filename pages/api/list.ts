import { NextApiRequest, NextApiResponse } from 'next'
import redis, { databaseName } from '@/lib/redis'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await redis.zrange(databaseName, 0, -1, { withScores: true })

    let result = []

    for (let i = 0; i < data.length - 1; i += 2) {
      let item = data[i]
      item['score'] = data[i + 1]
      result.push(item)
    }

    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ error })
  }
}
