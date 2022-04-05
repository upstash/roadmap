import { DateTime } from 'luxon'

export default function CardNew({ item, onVote, onPublish, onRemove, admin }) {
  const { score = 0, title, createdAt, user } = item

  const publish = () => {
    if (confirm('Feature will be release. Are you sure?')) {
      onPublish(item)
    }
  }

  const remove = () => {
    if (confirm('Feature will be removed. Are you sure?')) {
      onRemove(item)
    }
  }

  return (
    <article className="flex items-center space-x-4">
      <button
        className="
        flex flex-col items-center border border-zinc-300 py-1 w-10 rounded
        hover:bg-zinc-100
        dark:border-zinc-700 dark:hover:bg-zinc-700"
        onClick={() => onVote(item)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
        <span className="-mt-1 font-bold text-sm">{score}</span>
      </button>

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
          {process.env.NEXT_PUBLIC_AUTH0_ADMIN_ID === admin && (
            <>
              <span>•</span>
              <button
                type="button"
                onClick={publish}
                className="hover:underline"
              >
                Release
              </button>
            </>
          )}
          {process.env.NEXT_PUBLIC_AUTH0_ADMIN_ID === admin && (
            <>
              <span>•</span>
              <button
                type="button"
                onClick={remove}
                className="hover:underline"
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
