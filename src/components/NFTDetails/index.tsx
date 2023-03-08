import { type OwnedNft } from 'alchemy-sdk'
import Link from 'next/link'
import Button from '../Button'
import NFT from '../NFT'

interface Props {
  nft: OwnedNft
}

const NFTDetails = ({ nft, owner }: Props & { owner: string }) => {
  return (
    <>
      <NFT showBottom={false} {...nft} />
      <Link
        target="_blank"
        href={`https://opensea.io/assets/${nft.contract.address}/${nft.tokenId}`}
      >
        <Button className="my-5" isFluid>
          Purchase NFT
        </Button>
      </Link>
      <h1 className="text-2xl font-bold">NFT Information</h1>
      <div className="mb-5">
        <h2 className="text-xl font-bold">Name</h2>
        <p className="text-lg">{nft.title}</p>
      </div>
      <div className="mb-5">
        <h2 className="text-xl font-bold">Description</h2>
        <p className="text-lg">{nft.description}</p>
      </div>
      <div className="mb-5">
        <h2 className="text-xl font-bold">Owner</h2>
        <p className="text-lg">{owner}</p>
      </div>
      <h1 className="text-2xl font-bold">Contract</h1>
      <div className="mb-5">
        <h2 className="text-xl font-bold">Name</h2>
        <p className="text-lg">{nft.contract.name ?? 'No name'}</p>
      </div>
      <div className="mb-5">
        <h2 className="text-xl font-bold">Address</h2>
        <p className="text-lg">{nft.contract.address ?? 'No address'}</p>
      </div>
      <div className="mb-5">
        <h2 className="text-xl font-bold">Total Supply</h2>
        <p className="text-lg">
          {nft.contract.totalSupply ?? 'No total supply'}
        </p>
      </div>
      <h1 className="text-2xl font-bold">Misc</h1>
      <div className="mb-5">
        <h2 className="text-xl font-bold">Token Type</h2>
        <p className="text-lg">{nft.tokenType}</p>
      </div>
      <div className="mb-5">
        <h2 className="text-xl font-bold">Balance</h2>
        <p className="text-lg">{nft.balance}</p>
      </div>
    </>
  )
}

export default NFTDetails
