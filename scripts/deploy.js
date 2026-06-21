const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying EliteNFT with account:", deployer.address);

  const notRevealedUri = "https://example.com/metadata/not-revealed.json";

  const EliteNFT = await hre.ethers.getContractFactory("EliteNFT");
  const nft = await EliteNFT.deploy(deployer.address, notRevealedUri);

  await nft.waitForDeployment();
  const address = await nft.getAddress();

  console.log("🎉 EliteNFT deployed to:", address);
  console.log("Verify command:");
  console.log(`npx hardhat verify --network sepolia ${address} ${deployer.address} "${notRevealedUri}"`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});