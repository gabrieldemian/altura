import clsx from "clsx"
import { forwardRef, type LegacyRef } from "react"

interface Props {
  placeholder?: string
  value?: string
  onChange?: () => void
  invalid?: boolean
  autoFocus?: boolean
}


const Input = forwardRef(
  function input ({ autoFocus, placeholder, value, onChange, invalid }: Props, ref: LegacyRef<HTMLInputElement>): JSX.Element {
    const classes = clsx(
      'shadow-md px-4 py-2 rounded-md bg-white',
      invalid && 'border-red-500 border-2',
    )
    return (
      <input
        autoFocus={autoFocus}
        ref={ref}
        className={classes}
        placeholder={placeholder}
        onChange={onChange} value={value}
      />
    )
})

export default Input
