import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'destructive'
  size?: 'default' | 'sm' | 'lg'
}

export function Button({
  variant = 'default',
  size = 'default',
  className,
  ...props
}: ButtonProps) {
  const base = 'rounded text-sm font-medium transition'

  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 text-gray-800 hover:bg-gray-100',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
  }

  const sizes = {
    default: 'px-4 py-2',
    sm: 'px-3 py-1 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  )
}
