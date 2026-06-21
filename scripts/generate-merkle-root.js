const { StandardMerkleTree } = require("@openzeppelin/merkle-tree");
const fs = require("fs");

async function main() {
  // Add your whitelist addresses here
  const whitelistAddresses = [
    "0xYourAddress1...",
    "0xYourAddress2...",
    "0xYourAddress3...",
    // Add more addresses
  ];

  const tree = StandardMerkleTree.of(whitelistAddresses.map(addr => [addr]), ["address"]);

  console.log("Merkle Root:", tree.root);
  console.log("Whitelist Size:", whitelistAddresses.length);

  // Save to file
  fs.writeFileSync("merkle-root.json", JSON.stringify({
    root: tree.root,
    addresses: whitelistAddresses
  }, null, 2));

  console.log("✅ merkle-root.json created!");
}

main().catch(console.error);