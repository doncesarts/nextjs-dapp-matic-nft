/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import EmptyPageMessage from "../components/EmptyPageMessage";
import AssetCard from "../components/AssetCard";
import { useFetchMyNFTs } from "../hooks/hooks";



export default function MyAssets() {
  const { data, isFetching } = useFetchMyNFTs([]);
  const { nfts } = data;

  if (!isFetching && nfts.length <= 0)
    
    return <EmptyPageMessage title={"You do not own any asset."} />;
  return (
    
    <div className="flex justify-center">
      
      <div className="p-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft: any, i: any) => (
            
            <AssetCard key={i} nft={nft}  />
          ))}
        
        </div>
      
      </div>
    
    </div>
  );
}
