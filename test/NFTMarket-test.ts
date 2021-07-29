/* test/NFTMarket-test.js */
// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("NFTMarket", function() {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should create and execute market sales", async function() {
      /* deploy the marketplace */
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'ethers'.
      const Market = await ethers.getContractFactory("NFTMarket")
      const market = await Market.deploy()
      await market.deployed()
      const marketAddress = market.address
  
      /* deploy the NFT contract */
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'ethers'.
      const NFT = await ethers.getContractFactory("NFT")
      const nft = await NFT.deploy(marketAddress)
      await nft.deployed()
      const nftContractAddress = nft.address
  
      let listingPrice = await market.getListingPrice()
      listingPrice = listingPrice.toString()
  
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'ethers'.
      const auctionPrice = ethers.utils.parseUnits('1', 'ether')
  
      /* create two tokens */
      await nft.createToken("https://www.mytokenlocation.com")
      await nft.createToken("https://www.mytokenlocation2.com")
    
      /* put both tokens for sale */
      await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice })
      await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice })
      
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'ethers'.
      const [_, buyerAddress] = await ethers.getSigners()
    
      /* execute sale of token to another user */
      await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice})
  
      /* query for and return the unsold items */
      let items = await market.fetchMarketItems()
      items = await Promise.all(items.map(async (i: any) => {
        const tokenUri = await nft.tokenURI(i.tokenId)
        let item = {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          tokenUri
        }
        return item
      }))
      console.log('items: ', items)
    })
  })