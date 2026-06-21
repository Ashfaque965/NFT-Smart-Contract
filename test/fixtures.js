const { StandardMerkleTree } = require("@openzeppelin/merkle-tree");

async function deployFixture() {
  const [owner, user1, user2, user3] = await ethers.getSigners();

  const whitelist = [user1.address, user2.address];
  const tree = StandardMerkleTree.of(whitelist.map(a => [a]), ["address"]);

  const EliteNFT = await ethers.getContractFactory("EliteNFT");
  const nft = await EliteNFT.deploy(owner.address, "https://example.com/not-revealed.json");
  await nft.waitForDeployment();

  await nft.setMerkleRoot(tree.root);

  return { nft, owner, user1, user2, user3, merkleTree: tree };
}

module.exports = { deployFixture };