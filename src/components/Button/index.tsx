import clsx from "clsx"
import { type MouseEventHandler, type ReactNode } from "react"
import Loading from "../Loading"

interface Props {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: "button" | "submit" | "reset"
  isLoading?: boolean
}

const classes = clsx(
  'py-2 px-4 font-bold text-white',
  'bg-purple-600 rounded-lg shadow-md',
  'block disabled:cursor-not-allowed disabled:opacity-75'
)

const Button = ({ children, isLoading, onClick, type = "button" }: Props) => {
  return (
    <button disabled={isLoading} onClick={onClick} type={type} className={classes}>
      {isLoading && <Loading />}
      {isLoading ? 'Loading...' : children}
    </button>
  )
}

export default Button
