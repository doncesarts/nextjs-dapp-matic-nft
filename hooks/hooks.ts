// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module '../artifacts/contracts/NFT.sol... Remove this comment to see the full error message
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module '../artifacts/contracts/NFTMark... Remove this comment to see the full error message
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const getMarketItemDetailsFn = (tokenContract: any) => async (item: any) => {
  const tokenUri = await tokenContract.tokenURI(item.tokenId);
  let meta = {};
  try {
    const metadata = await axios.get(tokenUri);
    meta = {
      image: metadata.data.image,
      name: metadata.data.name,
      description: metadata.data.description,
    };
  } catch (error) {
    console.log("error while loading image", error);
  }
  const price = ethers.utils.formatUnits(item.price.toString(), "ether");
  return {
    price,
    tokenId: item.tokenId.toNumber(),
    seller: item.seller,
    owner: item.owner,
    ...meta,
  };
};

export const useFetchAllNFTs = (deps = []) => {
  const [response, setResponse] = useState({
    data: [],
    isFetching: false,
    error: null,
  });
  async function fetchData() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider();
    const tokenContract = new ethers.Contract(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      process.env.NEXT_PUBLIC_NFT_ADDRESS,
      NFT.abi,
      provider
    );
    const marketContract = new ethers.Contract(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS,
      Market.abi,
      provider
    );
    const marketItemDetails = getMarketItemDetailsFn(tokenContract);

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

export const useFetchCreatedNFTs = (deps = []) => {
  const [response, setResponse] = useState({
    data: { nfts: [], soldNfts: [] },
    isFetching: false,
    error: null,
  });
  async function fetchData() {
    /* create a generic provider and query for unsold market items */
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS,
      Market.abi,
      signer
    );
    const tokenContract = new ethers.Contract(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      process.env.NEXT_PUBLIC_NFT_ADDRESS,
      NFT.abi,
      provider
    );

    const marketItemDetails = getMarketItemDetailsFn(tokenContract);

    const marketItems = await marketContract.fetchItemsCreated();

    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    const nfts = await Promise.all(marketItems.map(marketItemDetails));
    const soldNfts = nfts.filter((i) => (i as any).sold);

    setResponse({
      data: { nfts, soldNfts },
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

export const useFetchMyNFTs = (deps = []) => {
  const [response, setResponse] = useState({
    data: { nfts: [] },
    isFetching: false,
    error: null,
  });
  async function fetchData() {
    /* create a generic provider and query for unsold market items */
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS,
      Market.abi,
      signer
    );
    const tokenContract = new ethers.Contract(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      process.env.NEXT_PUBLIC_NFT_ADDRESS,
      NFT.abi,
      provider
    );

    const marketItemDetails = getMarketItemDetailsFn(tokenContract);

    const marketItems = await marketContract.fetchMyNFTs();

    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    const nfts = await Promise.all(marketItems.map(marketItemDetails));

    setResponse({
      data: { nfts },
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

export const useCreateMarketSale = () => {
  const [response, setResponse] = useState({
    data: [],
    isFetching: false,
    error: null,
  });
  async function createMarketSale(nft: any) {
    await window.ethereum.enable();
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS,
      Market.abi,
      signer
    );

    /* user will be prompted to pay the asking process to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(
      process.env.NEXT_PUBLIC_NFT_ADDRESS,
      nft.tokenId,
      { value: price }
    );
    await transaction.wait();
    setResponse({
      data: {},
      isFetching: false,
      error: null,
    });
  }

  return { ...response, createMarketSale };
};

export const useCreateMarketItem = () => {
  const [response, setResponse] = useState({
    data: [],
    isFetching: false,
    error: null,
  });
  async function createMarketItem({
    url,
    price
  }: any) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      process.env.NEXT_PUBLIC_NFT_ADDRESS,
      NFT.abi,
      signer
    );

    // Create NFT Token
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    const priceEther = ethers.utils.parseUnits(price, "ether");

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS,
      Market.abi,
      signer
    );
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(
      process.env.NEXT_PUBLIC_NFT_ADDRESS,
      tokenId,
      priceEther,
      { value: listingPrice }
    );
    await transaction.wait();

    setResponse({
      data: { tokenId },
      isFetching: false,
      error: null,
    });
  }

  return { ...response, createMarketItem };
};
