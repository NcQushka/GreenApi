import { cn } from '@/shared/lib'
import type { ComponentProps } from 'react'
import { Link } from 'react-router'

type NavLinkProps = ComponentProps<typeof Link>

export const NavLink = ({ className, ...props }: NavLinkProps) => (
  <Link className={cn('text-sm text-muted hover:text-white', className)} {...props} />
)
