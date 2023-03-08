import { type NextPage } from 'next'
import { Button, Card, Input, Modal, NFT, NFTDetails } from '~/components'

import { api } from '~/utils/api'
import { type FormEvent, useState, useMemo, useCallback } from 'react'
import { usePaginate } from '~/hooks'
import { type OwnedNft } from 'alchemy-sdk'

const Home: NextPage = () => {
  // active NFT that will be rendered on the modal
  const [activeNFT, setActiveNFT] = useState<OwnedNft>()
  const [addr, setAddr] = useState<string>('')
  const [pageSize, setPageSize] = useState<string>('9')

  // mutation obj from TRPC
  const mutation = api.eth.getNFTs.useMutation()

  const { pages } = usePaginate({
    pageSize: parseInt(pageSize),
    total: mutation.data?.data.totalCount ?? 1,
  })

  const isAddrValid = useMemo(() => !!addr && addr.length === 42, [addr])
  // Page size input must only have numbers
  const isPageSizeValid = useMemo(() => /^\d+$/.test(pageSize), [pageSize])
  const isSearchValid = useMemo(
    () => isAddrValid && isPageSizeValid,
    [isPageSizeValid, isAddrValid],
  )

  // Will be triggered by "Submit" and "Next" buttons
  const getNFTs = useCallback(
    (e?: FormEvent<HTMLFormElement>) => {
      if (e) e.preventDefault()
      if (!isSearchValid) return
      mutation.mutate({
        pageSize: parseInt(pageSize),
        pageKey: mutation.data?.data.pageKey,
        addr: addr,
      })
    },
    [addr, isSearchValid, pageSize, mutation],
  )

  return (
    <>
      <main className="container mt-10 max-w-[1000px]">
        <Modal isOpen={!!activeNFT} close={() => setActiveNFT(undefined)}>
          <>
            {activeNFT && isSearchValid && (
              <NFTDetails owner={addr} nft={activeNFT} />
            )}
          </>
        </Modal>

        <Card>
          <p>
            Hello! Here you can see all NFTs that are owned by a specific
            wallet. Fill the address input below with a wallet address, and then
            press the &quot;Search&quot; button. You can view more details about
            the NFT by clicking on it.
          </p>
        </Card>
        <form
          onSubmit={getNFTs}
          className="my-10 flex flex-col gap-3 md:flex-row"
        >
          <div className="relative flex flex-col gap-2">
            <p>NFTs per page</p>
            <Input
              max={100}
              min={1}
              isInvalid={!isPageSizeValid}
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}
              placeholder="How many NFTs per page"
            />
            {!isPageSizeValid && (
              <small className="absolute -bottom-5 text-red-700">
                Must be a number
              </small>
            )}
          </div>

          <div className="relative flex flex-col gap-2">
            <p>Address</p>
            <Input
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
              placeholder="Address to search NFTs"
            />
            <small className="absolute -bottom-5 text-gray-700">
              Address must be 42 characters long
            </small>
          </div>
          <Button
            isFluid
            className="mt-5 h-[fit-content] self-end md:mt-0"
            isLoading={mutation.isLoading}
            isDisabled={!isSearchValid}
            type="submit"
          >
            Search
          </Button>
        </form>

        {mutation.isError && mutation.error.message}
        {mutation.status === 'success' && !mutation.data && (
          <p>This user does not have any NFTs</p>
        )}

        {mutation.status === 'success' && !!mutation.data && (
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-black text-violet-500">Owned NFTs</h1>
            <p>
              This user has <strong>{mutation.data.data.totalCount}</strong>{' '}
              NFTs
            </p>
            <p className="mb-5">
              <strong>{pages}</strong> pages with page size of {pageSize}
            </p>

            <div className="grid justify-center gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {mutation.data?.data.ownedNfts.map((nft, i) => (
                <NFT
                  onClick={() => setActiveNFT(nft)}
                  key={nft.tokenId.concat(String(i)).concat(nft.title)}
                  {...nft}
                />
              ))}
            </div>

            <div className="my-5 mx-auto flex items-center justify-center">
              <Button
                isDisabled={!mutation.data.data.pageKey}
                onClick={() => getNFTs()}
              >
                {'Next Page ->'}
              </Button>
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export default Home
