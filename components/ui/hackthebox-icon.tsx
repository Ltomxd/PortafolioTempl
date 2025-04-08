interface HackTheBoxIconProps {
  size?: number
  className?: string
}

export default function HackTheBoxIcon({ size = 24, className = "" }: HackTheBoxIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364M4 12a8 8 0 1 0 16 0 8 8 0 1 0-16 0z" />
    </svg>
  )
}
