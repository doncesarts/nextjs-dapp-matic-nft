/* pages/index.js */
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import AssetCard  from '../components/AssetCard'
import EmptyPageMessage  from '../components/EmptyPageMessage'
import {useFetchAllNFTs, useCreateMarketSale} from '../hooks/hooks'


export default function Home() { 
  const {data, isFetching, error, reFetchData} = useFetchAllNFTs();
  const {createMarketSale} = useCreateMarketSale();

  function buyNft(nft) { 
    createMarketSale(nft).then(reFetchData());
  }
  console.log("data", isFetching , data);
  if (!isFetching && data.length <= 0) return (<EmptyPageMessage title={"There is not assets in the market place yet."}/>)
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            data.map((nft, i) => (<AssetCard key={i} nft={nft} buyNft={buyNft} />))
          }
        </div>
      </div>
    </div>
  )
}