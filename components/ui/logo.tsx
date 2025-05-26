import Link from "next/link"

interface LogoProps {
  href?: string
  className?: string
}

export function Logo({ href = "/", className = "" }: LogoProps) {
  const LogoContent = (
    <div className={`flex items-center px-4 space-x-2 ${className}`}>
      <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white font-bold rounded-lg">
        <span>N</span>
      </div>
      <span className="text-xl font-bold">NexfyApp</span>
    </div>
  )

  if (href) {
    return <Link href={href}>{LogoContent}</Link>
  }

  return LogoContent
}
