import { type OwnedNft } from 'alchemy-sdk'
import Image from 'next/image'
import clsx from 'clsx'
import { type HTMLAttributes } from 'react'

interface Props {
  showBottom?: boolean
}

const NFT = ({
  media,
  title,
  description,
  onClick,
  contract,
  showBottom = true,
}: OwnedNft & Props & HTMLAttributes<HTMLDivElement>) => {
  const rootClass = clsx(
    'relative rounded-md cursor-pointer hover:[&img]:scale-110 group overflow-hidden',
  )

  const bottomClass = clsx(
    'p-3',
    'absolute bottom-0 left-0 right-0',
    'bg-black/50 text-white',
  )

  const imageClass = clsx(
    'aspect-square rounded-md group-hover:scale-105',
    'duration-300 w-full h-auto',
  )

  return (
    <div className={rootClass} onClick={onClick}>
      {media[0]?.format === 'mp4' ? (
        <video
          className={imageClass}
          src={media[0].thumbnail}
          width={200}
          height={200}
        />
      ) : (
        <Image
          className={imageClass}
          width={200}
          height={200}
          src={
            media[0]?.thumbnail ??
            media[0]?.gateway ??
            (contract.openSea?.imageUrl || '')
          }
          alt={description}
        />
      )}
      {showBottom && (
        <div className={bottomClass}>
          <h1 className="truncate-text line-clamp-1 text-xl font-bold">
            {title.length ? title : contract.openSea?.collectionName}
          </h1>
          <p className="truncate-text line-clamp-1">
            {description.length ? description : contract.openSea?.description}
          </p>
        </div>
      )}
    </div>
  )
}

export default NFT
