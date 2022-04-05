export default function authenticate(next) {
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
