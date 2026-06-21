// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract EliteNFT is ERC721A, Ownable, Pausable, ERC2981 {
    uint256 public constant MAX_SUPPLY = 5000;
    uint256 public mintPrice = 0.05 ether;
    uint256 public maxPerWallet = 5;

    string private _baseTokenURI;
    string public notRevealedUri;
    bool public revealed = false;

    bytes32 public merkleRoot;
    mapping(address => uint256) public whitelistMinted;
    mapping(address => uint256) public publicMinted;

    enum SalePhase { Closed, Presale, Public }
    SalePhase public salePhase = SalePhase.Closed;

    event Minted(address indexed minter, uint256 quantity);

    constructor(address initialOwner, string memory _notRevealedUri)
        ERC721A("EliteNFT", "ELITE")
        Ownable(initialOwner)
    {
        notRevealedUri = _notRevealedUri;
        _setDefaultRoyalty(initialOwner, 750); // 7.5% royalty
    }

    function mint(uint256 quantity, bytes32[] calldata proof) external payable whenNotPaused {
        require(salePhase != SalePhase.Closed, "Sale is closed");
        require(totalSupply() + quantity <= MAX_SUPPLY, "Max supply reached");
        require(quantity > 0, "Quantity must be > 0");

        if (salePhase == SalePhase.Presale) {
            require(isWhitelisted(msg.sender, proof), "Not whitelisted");
            require(whitelistMinted[msg.sender] + quantity <= maxPerWallet, "Exceeds wallet limit");
            whitelistMinted[msg.sender] += quantity;
        } else {
            require(publicMinted[msg.sender] + quantity <= maxPerWallet, "Exceeds wallet limit");
            publicMinted[msg.sender] += quantity;
        }

        require(msg.value >= mintPrice * quantity, "Insufficient funds");

        _safeMint(msg.sender, quantity);
        emit Minted(msg.sender, quantity);
    }

    function isWhitelisted(address account, bytes32[] calldata proof) public view returns (bool) {
        return MerkleProof.verify(proof, merkleRoot, keccak256(abi.encodePacked(account)));
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "URI query for nonexistent token");
        if (!revealed) return notRevealedUri;
        return string(abi.encodePacked(_baseTokenURI, _toString(tokenId), ".json"));
    }

    // ====================== Admin Functions ======================
    function setSalePhase(SalePhase _phase) external onlyOwner {
        salePhase = _phase;
    }

    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function reveal(string memory _baseURI) external onlyOwner {
        revealed = true;
        _baseTokenURI = _baseURI;
    }

    function setMintPrice(uint256 _newPrice) external onlyOwner {
        mintPrice = _newPrice;
    }

    function setMaxPerWallet(uint256 _newLimit) external onlyOwner {
        maxPerWallet = _newLimit;
    }

    function setDefaultRoyalty(address receiver, uint96 feeNumerator) external onlyOwner {
        _setDefaultRoyalty(receiver, feeNumerator);
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    // Required Overrides
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721A, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}