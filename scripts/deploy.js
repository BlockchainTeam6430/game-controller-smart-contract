// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Unik = await hre.ethers.getContractFactory("UnikNFT");
  const UnikContract = await Unik.deploy("Unik", "UNK", "0x02fc14d01F4E073829276cc2f4f94Fb4EDe1e0c4", 3000, "0x02fc14d01F4E073829276cc2f4f94Fb4EDe1e0c4");

  await UnikContract.deployed();

  const Factory = await hre.ethers.getContractFactory("UnikNFTFactory");
  const FactoryContract = await Factory.deploy();

  await FactoryContract.deployed();
  FactoryContract.createNFTCollection("Unik", "UNK", "3000", "0x02fc14d01F4E073829276cc2f4f94Fb4EDe1e0c4");

  const Marketplace = await hre.ethers.getContractFactory("UnikNFTMarketplace");
  const MarketplaceContract = await Marketplace.deploy("3000", "0x02fc14d01F4E073829276cc2f4f94Fb4EDe1e0c4", FactoryContract.address);

  await MarketplaceContract.deployed();

  console.log("Greeter deployed to:", UnikContract.address, FactoryContract.address, MarketplaceContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
