const { StandardMerkleTree } = require("@openzeppelin/merkle-tree");
const fs = require("fs");

function generateMerkleRoot(addresses) {
  const tree = StandardMerkleTree.of(addresses.map(addr => [addr]), ["address"]);
  
  const data = {
    root: tree.root,
    tree: tree.dump(),
    addressesCount: addresses.length
  };

  fs.writeFileSync("merkle-root.json", JSON.stringify(data, null, 2));
  console.log("✅ Merkle Root:", tree.root);
  return tree.root;
}

module.exports = { generateMerkleRoot };