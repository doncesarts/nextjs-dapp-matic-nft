/* pages/index.js */
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/AssetCard' was resolved to '... Remove this comment to see the full error message
import AssetCard from "../components/AssetCard";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/EmptyPageMessage' was resolv... Remove this comment to see the full error message
import EmptyPageMessage from "../components/EmptyPageMessage";
import { useFetchAllNFTs, useCreateMarketSale } from "../hooks/hooks";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message


export default function Home() {
  const { data, isFetching, reFetchData } = useFetchAllNFTs();
  const { createMarketSale } = useCreateMarketSale();
  const buyNft = async (nft: any) => {
    await createMarketSale(nft);
    reFetchData();
  }

  if (!isFetching && data.length <= 0)
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <EmptyPageMessage
        title={"There is not assets in the market place yet."}
      />
    );
  return (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div className="flex justify-center">
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      <div className="px-4" style={{ maxWidth: "1600px" }}>
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {data.map((nft: any, i: any) => (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <AssetCard key={i} nft={nft} buyNft={buyNft} showBuyButton />
          ))}
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </div>
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </div>
    {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
    </div>
  );
}
