import clsx from 'clsx'
import { type HTMLAttributes, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  rest?: any
}

const Card = ({
  children,
  className = '',
  ...rest
}: Props & HTMLAttributes<HTMLDivElement>) => {
  const classes = clsx('rounded-md bg-white p-4 shadow-md', className)
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

export default Card
