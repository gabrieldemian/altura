import clsx from 'clsx'
import { type InputHTMLAttributes } from 'react'

interface Props {
  isInvalid?: boolean
  rest?: any
}

const Input = ({
  autoFocus,
  placeholder,
  value,
  onChange,
  isInvalid,
  ...rest
}: Props & InputHTMLAttributes<HTMLInputElement>): JSX.Element => {
  const classes = clsx(
    'shadow-md px-4 py-2 rounded-md bg-white',
    isInvalid && 'invalid:border-red-500 invalid:border-2',
  )
  return (
    <input
      autoFocus={autoFocus}
      className={classes}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      {...rest}
    />
  )
}

export default Input
