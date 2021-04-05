import Redis from 'ioredis'

function fixUrl(url) {
  if (!url) {
    return ''
  }
  if (url.startsWith('redis://') && !url.startsWith('redis://:')) {
    return url.replace('redis://', 'redis://:')
  }
  if (url.startsWith('rediss://') && !url.startsWith('rediss://:')) {
    return url.replace('rediss://', 'rediss://:')
  }
  return url
}

export function getRedis() {
  return new Redis(fixUrl(process.env.REDIS_URL))
}

export function authenticate(next) {
  return async (req, res) => {
    const { authorization } = req.headers
    if (!authorization) return res.status(400).send('auth fail')

    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${authorization}`,
          'Content-Type': 'application/json'
        }
      }
    )
    req.user = await response.json()

    return next(req, res)
  }
}
