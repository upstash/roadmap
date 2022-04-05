import { useTheme } from 'next-themes'

export default function Footer() {
  const { theme, setTheme } = useTheme()

  return (
    <footer
      className="text-center py-10 border-t border-t-zinc-200 mt-20
    dark:border-t-zinc-700"
    >
      <p>
        <a
          href="https://github.com/upstash/roadmap"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dimmed"
        >
          Create your own Roadmap Voting App with Upstash and Redis.
        </a>
      </p>

      <div className="mt-6">
        <select
          className="form-select py-2 text-sm leading-none"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="system">System</option>
        </select>
      </div>
    </footer>
  )
}
