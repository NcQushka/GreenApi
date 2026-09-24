import { cn } from '@/shared/lib'
import type { ComponentProps } from 'react'

const buttonClassName = {
  primary: 'rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white disabled:opacity-40',
  ghost: 'text-sm text-muted',
} as const

type ButtonProps = ComponentProps<'button'> & {
  variant?: keyof typeof buttonClassName
}

export const Button = ({
  className,
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) => (
  <button type={type} className={cn(buttonClassName[variant], className)} {...props} />
)
