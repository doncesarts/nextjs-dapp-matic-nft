/* pages/index.js */
import AssetCard from "../components/AssetCard";
import EmptyPageMessage from "../components/EmptyPageMessage";
import { useFetchAllNFTs, useCreateMarketSale } from "../hooks/hooks";

export default function Home() {
  const { data, isFetching, reFetchData } = useFetchAllNFTs();
  const { createMarketSale } = useCreateMarketSale();
  const buyNft = async (nft) => {
    await createMarketSale(nft);
    reFetchData();
  }

  if (!isFetching && data.length <= 0)
    return (
      <EmptyPageMessage
        title={"There is not assets in the market place yet."}
      />
    );
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {data.map((nft, i) => (
            <AssetCard key={i} nft={nft} buyNft={buyNft} showBuyButton />
          ))}
        </div>
      </div>
    </div>
  );
}
