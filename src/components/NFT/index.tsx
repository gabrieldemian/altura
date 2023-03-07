import { type OwnedNft } from "alchemy-sdk";
import Image from 'next/image'
import clsx from "clsx";

interface Props {
  onClick?: () => void
}

const NFT = ({ media, title, description, onClick, contract }: OwnedNft & Props) => {
  const root = clsx(
    'relative rounded-md cursor-pointer hover:[&img]:scale-110 group overflow-hidden'
  )

  const bottom = clsx(
    'p-3',
    'absolute bottom-0 left-0 right-0',
    'bg-black/50 text-white'
  )

  const image = clsx(
    'aspect-square rounded-md group-hover:scale-105',
    'duration-300'
  )

  return (
    <div className={root} onClick={onClick}>
      {media[0]?.format === "mp4" ? 
        <video className={image} src={media[0].thumbnail} width={200} height={200} />
        :
        <Image
          className={image}
          width={200}
          height={200}
          src={media[0]?.thumbnail ?? (media[0]?.gateway ?? (contract.openSea?.imageUrl || ''))}
          alt={description}
        />
      }
      <div className={bottom}>
        <h1 className="truncate-text line-clamp-1 text-xl font-bold">{title.length ? title : contract.openSea?.collectionName}</h1>
        <p className="truncate-text line-clamp-1">{description.length ? description : contract.openSea?.description}</p>
      </div>
    </div>
  )
}

export default NFT
