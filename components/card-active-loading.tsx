export default function CardActiveLoading() {
  return (
    <article
      className="flex items-center space-x-4 text-zinc-100
    dark:text-zinc-800"
    >
      <div
        className="flex flex-col items-center bg-zinc-100 h-12 w-10 rounded
      dark:bg-zinc-800"
      />

      <div>
        <h3 className="text-lg font-bold">
          <span className="bg-zinc-100 rounded dark:bg-zinc-800">
            New awesome feature request please
          </span>
        </h3>
        <div className="mt-1 flex items-center space-x-2 leading-4">
          <span className="bg-zinc-100 rounded dark:bg-zinc-800">
            Adem ilter
          </span>
          <span className="bg-zinc-100 rounded dark:bg-zinc-800">
            23 minutes ago
          </span>
        </div>
      </div>
    </article>
  )
}
