import { type NextPage } from "next";
import Head from "next/head";
import { Button, Input, NFT } from "~/components";

import { api } from "~/utils/api";
import { type FormEvent, useRef, useState, useMemo } from 'react';
import { usePaginate } from "~/hooks";

const Home: NextPage = () => {

  const addrRef = useRef<HTMLInputElement>(null)
  const mutation = api.eth.getNFTs.useMutation()

  const [pageSize, setPageSize] = useState<string>('9')

  const {pages} = usePaginate({ pageSize: parseInt(pageSize), total: mutation.data?.data.totalCount ?? 1 })

  const [isSearchInvalid, setIsSearchInvalid] = useState(false)

  // only accept numbers
  const isPageSizeInvalid = useMemo(() => /\D+/ig.test(pageSize) , [pageSize])

  const nextPage = () => {
    if (!addrRef.current || !mutation.data) return
    mutation.mutate({ pageSize: parseInt(pageSize), pageKey: mutation.data.data.pageKey, addr: addrRef.current?.value })
  }

  const getNFTs = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!addrRef.current) return
    const addr = addrRef.current.value
    if (addr.length !== 42) {
      setIsSearchInvalid(true)
      return 
    }
    setIsSearchInvalid(false)
    mutation.mutate({ pageSize: parseInt(pageSize), pageKey: mutation.data?.data.pageKey, addr })
  }

  return (
    <>
      <Head>
        <title>Altura Test</title>
      </Head>
      <main className="container max-w-[70ch] flex justify-center mt-20">
        <div className="w-full">
          <form onSubmit={getNFTs} className='flex flex-col md:flex-row gap-3 my-10 justify-center'>

            <div className='flex gap-2 relative flex-col'>
              <p>How many NFTs per page</p>
              <Input
                invalid={isPageSizeInvalid}
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
                placeholder='How many NFTs per page'
              />
              {isPageSizeInvalid && <small className='absolute -bottom-5 text-red-700'>Should be a number</small>}
            </div>

            <div className='flex gap-2 relative flex-col'>
              <p>Address</p>
              <Input invalid={isSearchInvalid} ref={addrRef} placeholder='Address to search NFTs' />
              {isSearchInvalid && <small className='absolute -bottom-5 text-red-700'>Address should have 42 bytes</small>}
            </div>
            <Button isFluid className="h-[fit-content] self-end" isLoading={mutation.isLoading} type="submit">
              Search
            </Button>

          </form>
          {mutation.isError && (JSON.stringify(mutation.error.message))}
          {mutation.status === "success" &&
            <div className="flex items-center flex-col">

              <h1 className="text-3xl text-violet-500 font-black">Owned NFTs</h1>
              <p>This user has <strong>{mutation.data.data.totalCount}</strong> NFTs</p>
              <p className="mb-5"><strong>{pages}</strong> pages with page size of {pageSize}</p>

              <div className="flex flex-wrap basis-52 gap-3 justify-center">
               {mutation.data?.data.ownedNfts.map((nft, i) => (
                  <NFT {...nft} key={nft.tokenId.concat(String(i))} />
                ))}
              </div>

              <div className="flex mx-auto justify-center items-center my-5">
                <Button isDisabled={!mutation.data.data.pageKey} onClick={nextPage}>{"Next ->"}</Button>
              </div>
            </div>
          }
        </div>
      </main>
    </>
  );
};

export default Home;
