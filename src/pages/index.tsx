import { type NextPage } from "next";
import Head from "next/head";
import { Button, Input } from "~/components";

import { api } from "~/utils/api";
import { type FormEvent, useRef, useState } from 'react';

const Home: NextPage = () => {

  const [isSearchInvalid, setIsSearchInvalid] = useState(false)

  const addrRef = useRef<HTMLInputElement>(null)
  const hello = api.eth.getNFTs.useMutation();

  const getNFTs = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!addrRef.current) return
    const addr = addrRef.current.value
    if (addr.length !== 42) {
      setIsSearchInvalid(true)
      return 
    }
    setIsSearchInvalid(false)
    hello.mutate({ addr })
  }

  return (
    <>
      <Head>
        <title>Altura Test</title>
      </Head>
      <main className="container flex justify-center mt-20">
        <div>
          <form onSubmit={getNFTs} className='flex gap-3 my-10'>
            <div className='flex relative flex-col'>
              <Input invalid={isSearchInvalid} ref={addrRef} placeholder='Address to search NFTs' />
              {isSearchInvalid && <small className='absolute -bottom-5 text-red-700'>Address should have 42 bytes</small>}
            </div>
            <Button isLoading={hello.isLoading} type="submit">
              Search
            </Button>
          </form>
          {hello.isError && (JSON.stringify(hello.error.message))}
          {hello.status === "success" &&
            hello.data?.data.ownedNfts.map((nft, i) => (
              <p key={nft.title.concat(i+'')}>{nft.title}</p>
            ))
          }
        </div>
      </main>
    </>
  );
};

export default Home;
