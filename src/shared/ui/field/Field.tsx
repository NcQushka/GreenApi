import { cn } from '@/shared/lib'
import type { ComponentProps } from 'react'

type FieldProps = ComponentProps<'input'>

export const Field = ({ className, ...props }: FieldProps) => (
  <input
    className={cn(
      'rounded-lg bg-field px-3 py-2 text-sm text-white outline-none placeholder:text-muted',
      className,
    )}
    {...props}
  />
)
