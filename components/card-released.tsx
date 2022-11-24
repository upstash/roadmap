export default function CardReleased({ item }) {
  const { score, title } = item

  return (
    <article className="flex items-center space-x-4">
      <div
        className="flex flex-col items-center bg-zinc-200 py-1 w-10 rounded
      dark:bg-zinc-700"
      >
        <span className="font-bold text-sm">{score}</span>
      </div>
      <h5>{title}</h5>
    </article>
  )
}
