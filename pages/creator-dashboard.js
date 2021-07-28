/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* pages/creator-dashboard.js */
import AssetCard from "../components/AssetCard";
import EmptyPageMessage from "../components/EmptyPageMessage";
import { useFetchCreatedNFTs } from "../hooks/hooks";

export default function CreatorDashboard() {
  const { data, isFetching } = useFetchCreatedNFTs([]);
  const { nfts, soldNfts } = data;
  if (!isFetching && nfts.length <= 0)
    return <EmptyPageMessage title={"You have not created any asset yet."} />;
  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl py-2">Items Created</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <AssetCard key={i} nft={nft} />
          ))}
        </div>
      </div>
      <div className="px-4">
        {soldNfts.length > 0 && (
          <div>
            <h2 className="text-2xl py-2">Items sold</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {soldNfts.map((nft, i) => (
                <AssetCard key={i} nft={nft} buyNft={buyNft} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
