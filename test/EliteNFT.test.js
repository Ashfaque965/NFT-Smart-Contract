const { expect } = require("chai");
const { StandardMerkleTree } = require("@openzeppelin/merkle-tree");

describe("EliteNFT", function () {
  let owner, user1, user2, nft, merkleRoot, tree;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    const whitelist = [user1.address, user2.address];
    tree = StandardMerkleTree.of(whitelist.map(addr => [addr]), ["address"]);
    merkleRoot = tree.root;

    const EliteNFT = await ethers.getContractFactory("EliteNFT");
    nft = await EliteNFT.deploy(owner.address, "https://example.com/not-revealed.json");
    await nft.waitForDeployment();

    await nft.setMerkleRoot(merkleRoot);
  });

  it("Should set correct name and symbol", async function () {
    expect(await nft.name()).to.equal("EliteNFT");
    expect(await nft.symbol()).to.equal("ELITE");
  });

  it("Should allow owner to mint", async function () {
    await nft.safeMint(owner.address, 1); // Using ERC721A safeMint
    expect(await nft.balanceOf(owner.address)).to.equal(1);
  });

  it("Should allow whitelist mint", async function () {
    await nft.setSalePhase(1); // 1 = Presale
    const proof = tree.getProof([user1.address]);
    await nft.connect(user1).mint(2, proof, { value: ethers.parseEther("0.1") });
    expect(await nft.balanceOf(user1.address)).to.equal(2);
  });

  it("Should reveal metadata", async function () {
    await nft.reveal("https://my-nft-metadata.com/");
    expect(await nft.revealed()).to.equal(true);
  });

  it("Should respect max supply", async function () {
    await expect(nft.mint(6000, [], { value: ethers.parseEther("300") }))
      .to.be.revertedWith("Max supply reached");
  });
});