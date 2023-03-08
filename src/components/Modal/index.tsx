import clsx from 'clsx'
import { useEffect, useState } from 'react'

interface Props {
  children: JSX.Element
  minWidth?: string
  maxWidth?: string
  isOpen: boolean
  desirableWidth?: string
  close: () => void
}

const overlayClass = clsx(
  'fixed inset-0 z-[3] h-full w-full cursor-pointer',
  'bg-stone-700/50 backdrop-blur-sm',
)
const modalClass = clsx(
  'absolute top-[50%] left-[50%] z-[4] min-h-[50vh] max-h-[90vh] max-w-[90vw]',
  'overflow-y-auto rounded-md bg-gray-200 shadow-lg container',
  '-translate-x-1/2 -translate-y-1/2 p-3',
)

const Modal = ({
  children,
  close,
  isOpen,
  minWidth = '300px',
  maxWidth = '900px',
  desirableWidth = '25vw',
}: Props) => {
  const [shouldRender, setRender] = useState(isOpen)

  useEffect(() => {
    const htmlElement = document.querySelector('html')
    setTimeout(
      () => {
        setRender(isOpen)
      },
      !isOpen ? 450 : 0,
    )
    if (isOpen && htmlElement) {
      // setRender(true)
      htmlElement.classList.add('lock-scroll')
    }
    return () => {
      htmlElement && htmlElement.classList.remove('lock-scroll')
    }
  }, [isOpen])

  return (
    <>
      {shouldRender && (
        <div
          style={{ animation: `${isOpen ? 'fadeIn' : 'fadeOut'} .5s` }}
          className={overlayClass}
          onClick={close}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: `clamp(${minWidth}, ${desirableWidth}, ${maxWidth})`,
            }}
            className={modalClass}
          >
            {children}
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
