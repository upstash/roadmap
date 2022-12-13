import { DateTime } from 'luxon'
import { useContext } from 'react'
import GlobalStoreContext, { Feature, VoteType } from '@/store/index'
import { useSession } from 'next-auth/react'

export default function CardActive({ item }: { item: Feature }) {
  const { onPublish, onRemove, onVote } = useContext(GlobalStoreContext)
  const { data: session } = useSession()

  const { score = 0, title, createdAt, user } = item

  const isAdmin = session?.user['role'] === 'admin'

  return (
    <article className="p-2 flex items-center space-x-4 border border-zinc-200 dark:border-zinc-700 rounded-md">
      <div className="flex flex-col gap-1">
        <button
          className="flex flex-col items-center border border-zinc-300 py-1 px-2 rounded hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-700"
          onClick={() => onVote(item, VoteType.UP)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>

        <div className="text-center">{score}</div>

        <button
          className="flex flex-col items-center border border-zinc-300 py-1 px-2 rounded hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-700"
          onClick={() => onVote(item, VoteType.DOWN)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      <div>
        <h3 className="text-lg font-bold">{title}</h3>

        <div className="flex items-center space-x-1 text-dimmed">
          {user.name && (
            <>
              <span>{user.name}</span>
              <span>•</span>
            </>
          )}
          <span>{DateTime.fromMillis(createdAt).toRelative()}</span>
          {isAdmin && (
            <>
              <span>•</span>
              <button
                type="button"
                className="hover:underline"
                onClick={() => {
                  if (confirm('Feature will be release. Are you sure?')) {
                    onPublish(item)
                  }
                }}
              >
                Release
              </button>
            </>
          )}
          {isAdmin && (
            <>
              <span>•</span>
              <button
                type="button"
                className="hover:underline"
                onClick={() => {
                  if (confirm('Feature will be removed. Are you sure?')) {
                    onRemove(item)
                  }
                }}
              >
                Remove
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
