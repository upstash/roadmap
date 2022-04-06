import { useTheme } from 'next-themes'

export default function Header() {
  const { resolvedTheme } = useTheme()

  return (
    <header className="pt-20 mb-12">
      <div className="flex justify-center">
        <img
          src={resolvedTheme === 'light' ? '/logo-light.svg' : '/logo-dark.svg'}
          alt="Upstash"
          width={140}
        />
      </div>

      <div className="mt-6 text-center text-dimmed">
        <p>Help us by voting our roadmap.</p>
        <p>Vote up the features you want to see in the next release.</p>
      </div>
    </header>
  )
}
