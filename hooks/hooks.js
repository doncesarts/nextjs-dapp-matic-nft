import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { ethers } from 'ethers'
import Web3Modal from "web3modal";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

export const useFetchAllNFTs = (deps = []) => {
  const [response, setResponse] = useState({
    data:  [] ,
    isFetching: false,
    error: null,
  });
  async function fetchData() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider();
    const tokenContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NFT_ADDRESS,
      NFT.abi,
      provider
    );
    const marketContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS,
      Market.abi,
      provider
    );
    const marketItemDetails = async (item) => {
      const tokenUri = await tokenContract.tokenURI(item.tokenId);
      const meta = await axios.get(tokenUri);
      const price = ethers.utils.formatUnits(item.price.toString(), "ether");
      return {
        price,
        tokenId: item.tokenId.toNumber(),
        seller: item.seller,
        owner: item.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      };
    };
    const marketItems = await marketContract.fetchMarketItems();

    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    const nfts = await Promise.all(marketItems.map(marketItemDetails));
    
    setResponse({
      data: nfts,
      isFetching: false,
      error: null,
    });
  }
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { ...response, reFetchData: fetchData };
};

export const useCreateMarketSale = (deps = []) => {
    const [response, setResponse] = useState({
      data:  [] ,
      isFetching: false,
      error: null,
    });
    async function createMarketSale(nft) {
   
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS, Market.abi, signer)

    /* user will be prompted to pay the asking process to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
    const transaction = await contract.createMarketSale(process.env.NEXT_PUBLIC_NFT_ADDRESS, nft.tokenId, {
      value: price
    })
    await transaction.wait()
    setResponse({
        data: {},
        isFetching: false,
        error: null,
      });
    }
  
    return { ...response, createMarketSale };
  };
  