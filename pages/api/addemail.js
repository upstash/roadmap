import { redis } from './utils'

module.exports = async (req, res) => {
  const body = req.body
  const email = body['email']

  if (email && validateEmail(email)) {
    await redis.sadd('emails', email)
    res.json({
      body: 'success'
    })
  } else {
    res.json({
      error: 'Invalid email'
    })
  }
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
