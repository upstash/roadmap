import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export const authOptions = {
  adapter: UpstashRedisAdapter(redis),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  callbacks: {
    async session(session) {
      return {
        ...session.session,
        user: {
          ...session.user,
          role:
            process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(',').some(e => e.trim() === session.user.email)
              ? 'admin'
              : 'user'
        }
      }
    }
  }
}

export default NextAuth(authOptions)
