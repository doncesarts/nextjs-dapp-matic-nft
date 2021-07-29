/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

/**
 * Display the asset information as a card and allows to interact with it.
 * @App Build Decentralized Art Market using ERC-721
 * @author christopher chavez
 */
const AssetCard = (props) => {
  const { nft, buyNft, showBuyButton } = props;
  return (
    <div  className="border shadow rounded-xl overflow-hidden">
      {nft.image ? (<img src={nft.image} width="300" height="250"/>): (
        <img src={'/no-image-icon.png'}  width="300" height="250"/>
      )}
      <div className="p-4">
        <p style={{ height: "64px" }} className="text-2xl font-semibold">
          {nft.name}
        </p>
        <div style={{ height: "70px", overflow: "hidden" }}>
          <p className="text-gray-400">{nft.description}</p>
        </div>
      </div>
      
      <div className="p-4 bg-black">
        <p className="text-2xl mb-4 font-bold text-white">{`${nft.price} ${process.env.NEXT_PUBLIC_CHAIN_NATIVE_CRYPTO}`}</p>
        {showBuyButton && (
        <button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>
          Buy
        </button>
        )}
      </div>

    </div>
  );
};
export default AssetCard;