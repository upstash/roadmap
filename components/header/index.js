export default function Header() {
  return (
    <header className="py-10">
      <div className="flex justify-center">
        <img src="/upstash.svg" alt="Upstash" width={200} />
      </div>

      <div className="mt-6 text-center">
        <p>Help us by voting our roadmap.</p>
        <p>Vote up the features you want to see in the next release.</p>
      </div>
    </header>
  )
}
