export default function Footer() {
  return (
    <footer className="text-center py-10 border-t mt-10">
      <a
        href="https://vercel.com/integrations/upstash"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-2"
      >
        <span>Powered by</span>
        <img src="/vercel.svg" alt="Vercel Logo" width={70} />
        <span>and</span>
        <img src="/upstash.svg" alt="Upstash Logo" width={90} />
      </a>
    </footer>
  )
}
