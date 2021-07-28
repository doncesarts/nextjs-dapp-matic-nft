# nextjs-dapp-matic-nft
NextJS Daap, Matic, ERC721 Marketplace 
Credit of project idea https://github.com/dabit3/polygon-ethereum-nextjs-marketplace/

https://github.com/doncesarts/react-dapp-erc721-token


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started


Configure private key to deploy smart contracts  `.secret` 

Run hardhat ethereum node:

```bash
npx hardhat node
```

Deploy contracts to the network 

```bash
npx hardhat run --network localhost scripts/deploy.js
```
The address of the smart contracts will be displayed:

```

nftMarket deployed to: 0x....
nft deployed to: 0x....
```

Configure environment variables at `.env` 



Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

