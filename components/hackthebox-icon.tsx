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
      <path d="M20.83 8.01l-8-4.5c-.5-.28-1.17-.28-1.67 0l-8 4.5c-.51.29-.83.84-.83 1.42v5.15c0 .58.32 1.13.83 1.42l8 4.5c.5.28 1.17.28 1.67 0l8-4.5c.51-.29.83-.84.83-1.42V9.43c0-.58-.32-1.13-.83-1.42z" />
      <path d="M3.37 7.83L12 12.5l8.63-4.67" />
      <path d="M12 12.5V22" />
    </svg>
  )
}
