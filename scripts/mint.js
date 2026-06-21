const hre = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();
  const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Update this

  const EliteNFT = await hre.ethers.getContractAt("EliteNFT", contractAddress);

  console.log("Minting from:", signer.address);

  // Example: Public Mint 2 NFTs
  const quantity = 2;
  const price = await EliteNFT.mintPrice();
  const totalCost = price * BigInt(quantity);

  const tx = await EliteNFT.mint(quantity, [], { value: totalCost });
  await tx.wait();

  console.log(`✅ Successfully minted ${quantity} NFTs!`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});