const hre = require("hardhat");

async function main() {
  const contractAddress = "0xYourDeployedAddressHere"; // ← Update this
  const initialOwner = "0xYourOwnerAddress";
  const notRevealedUri = "https://example.com/not-revealed.json";

  console.log("Verifying contract on Etherscan...");

  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: [initialOwner, notRevealedUri],
  });

  console.log("✅ Contract verified successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});