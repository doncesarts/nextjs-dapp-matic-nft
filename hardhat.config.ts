/* hardhat.config.js */
// https://docs.matic.network/docs/develop/network-details/network
import "@nomiclabs/hardhat-waffle";
// import "@nomiclabs/hardhat-ethers";

import fs from "fs";
import { HardhatUserConfig } from "hardhat/types/config";
import { task } from "hardhat/config";

// eslint-disable-next-line react-hooks/rules-of-hooks
// usePlugin("hardhat-deploy-ethers");


const privateKey: string = fs.readFileSync(".secret").toString().trim();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs: any, hre: any) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    mainnet: {
      url: "https://rpc-mainnet.matic.network",
      accounts: [privateKey]
    },
    mumbai: {
      url: "https://rpc-mumbai.matic.today",
      accounts: [privateKey]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
 export default config;