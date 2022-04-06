import { Redis } from '@upstash/redis'

export const databaseName =
  process.env.NODE_ENV === 'development' ? 'roadmap-dev' : 'roadmap'

const redis = Redis.fromEnv()

export default redis
