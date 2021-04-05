import { DateTime } from 'luxon'

export default function FeatureCard({ item, onVote }) {
  const { score, title, createdAt, user } = item
  return (
    <article className="flex items-center space-x-4">
      <button
        className="flex flex-col items-center border border-gray-300 py-1 w-10 rounded"
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
        <div className="flex items-center space-x-1 text-gray-500">
          <span>{user.name}</span>
          <span>•</span>
          <span>{DateTime.fromMillis(createdAt).toRelative()}</span>
        </div>
      </div>
    </article>
  )
}

export function FeatureCardSkeleton() {
  return (
    <article className="flex items-center space-x-4 text-gray-100">
      <div className="flex flex-col items-center bg-gray-100 h-12 w-10 rounded" />
      <div>
        <h3 className="text-lg font-bold">
          <span className="bg-gray-100 rounded">
            New awesome feature request please
          </span>
        </h3>
        <div className="mt-1 flex items-center space-x-2 leading-4">
          <span className="bg-gray-100 rounded">Adem ilter</span>
          <span className="bg-gray-100 rounded">23 minutes ago</span>
        </div>
      </div>
    </article>
  )
}
