const hre = require("hardhat");

async function main() {
  const contractAddress = "0xYourDeployedAddressHere";
  const newBaseURI = "https://my-metadata.com/nfts/";

  const EliteNFT = await hre.ethers.getContractAt("EliteNFT", contractAddress);
  const tx = await EliteNFT.reveal(newBaseURI);
  await tx.wait();

  console.log("✅ Base URI updated and collection revealed!");
}

main().catch(console.error);