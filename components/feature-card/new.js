import { DateTime } from 'luxon'

export default function FeatureCardNew({ item, onVote, onPublish }) {
  const { score, title, createdAt, user } = item

  const publish = () => {
    if (confirm('Are you sure?')) {
      onPublish(item)
    }
  }

  return (
    <article className="flex items-center space-x-4">
      <button
        className="
        flex flex-col items-center border border-gray-300 py-1 w-10 rounded
        hover:bg-gray-100"
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

        <div className="flex items-center space-x-1 text-gray-400">
          <span>{user.name}</span>
          <span>•</span>
          <span>{DateTime.fromMillis(createdAt).toRelative()}</span>

          {process.env.NEXT_PUBLIC_AUTH0_ADMIN_ID === user.sub && (
            <>
              <span>•</span>
              <button
                type="button"
                onClick={publish}
                className="hover:text-gray-800 hover:underline"
              >
                Release
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
