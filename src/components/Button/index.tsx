import clsx from "clsx"
import { type MouseEventHandler, type ReactNode } from "react"
import Loading from "../Loading"

interface Props {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: "button" | "submit" | "reset"
  isLoading?: boolean
  isDisabled?: boolean
  isFluid?: boolean
  className?: string
}

const Button = ({ children, isLoading, onClick, type = "button", isDisabled, className = '', isFluid }: Props) => {

  const classes = clsx(
    'py-2 px-4 font-bold text-white duration-300',
    'bg-violet-500 rounded-lg shadow-md',
    'block disabled:cursor-not-allowed disabled:opacity-75',
    'hover:bg-violet-600 active:bg-violet-700 focus:outline-none',
    'focus:ring focus:ring-violet-300',
    isFluid && 'w-full',
    className
  )

  return (
    <button disabled={isLoading || isDisabled} onClick={onClick} type={type} className={classes}>
      {isLoading && <Loading />}
      {isLoading ? 'Loading...' : children}
    </button>
  )
}

export default Button
