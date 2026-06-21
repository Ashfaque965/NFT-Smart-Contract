
# EliteNFT - Professional NFT Smart Contract

![Solidity](https://img.shields.io/badge/Solidity-0.8.24-blue)
![Hardhat](https://img.shields.io/badge/Hardhat-2.22.0-yellow)
![ERC721A](https://img.shields.io/badge/ERC721A-Gas%20Optimized-green)
![License](https://img.shields.io/badge/License-MIT-green)

A **production-ready**, gas-optimized ERC721A NFT smart contract with advanced features including whitelist presale, royalties, reveal mechanism, and more.

---
### About ###


About the ProjectEliteNFT is a modern, gas-efficient, and production-ready NFT smart contract developed using Solidity. It is designed for creators, artists, and Web3 projects who want to launch a professional NFT collection with advanced features and strong security.This smart contract goes far beyond a basic ERC-721 token. It incorporates industry best practices and features used by successful NFT projects in 2025–2026.Key HighlightsGas Optimized: Built on ERC721A, which dramatically reduces minting costs when users mint multiple NFTs at once.
Whitelist Presale: Secure and fair presale using Merkle Proof technology.
Reveal System: Keep your metadata hidden until the official reveal moment.
Royalties: Built-in ERC2981 standard for automatic creator royalties on secondary sales (OpenSea, Blur, etc.).
Flexible Minting: Supports multiple sale phases (Presale → Public) with per-wallet limits.
Security Focused: Uses battle-tested OpenZeppelin contracts with pause functionality for emergency control.
Developer Friendly: Clean code, comprehensive tests, and easy-to-use scripts.

Why This Project?Most basic NFT contracts only handle simple minting. EliteNFT provides everything a real NFT collection needs:Professional minting experience for your community
Protection against bots and gas wars
Revenue control for the creator
Long-term compatibility with major marketplaces
Easy integration with websites and Discord bots

Target AudienceNFT Artists & Creators
Web3 Startup Teams
PFP (Profile Picture) Projects
Digital Collectibles Brands
GameFi & Metaverse Projects
Blockchain Developers learning advanced NFT development

Current StatusFully developed and tested on testnet
Ready for deployment
Actively maintained
Open source under MIT License

Future Enhancements (Planned)Dutch Auction minting
Staking & Reward system
On-chain generative art support
Multi-chain deployment (Polygon, Base, etc.)
Full frontend dApp (Next.js + Wagmi)

Built with  using Hardhat, Solidity, ERC721A, and OpenZeppelin.



## ✨ Features

- **ERC721A** – Gas-optimized batch minting
- **Whitelist Presale** – Merkle Proof based
- **Public Sale** – With per-wallet limits
- **Reveal Mechanism** – Hidden metadata until reveal
- **ERC2981 Royalties** – Built-in secondary sale royalties
- **Pausable** – Emergency pause functionality
- **Max Supply & Per Wallet Limit**
- **Multiple Sale Phases**
- **Owner Controls** – Mint price, max per wallet, royalty settings
- **Events** – Well documented for frontend integration
- **Comprehensive Testing** – Unit tests + fixtures

---

## 🛠 Tech Stack

- **Solidity** ^0.8.24
- **ERC721A** (Gas Efficient)
- **OpenZeppelin Contracts** v5
- **Hardhat** – Development & Testing Framework
- **Ethers.js** v6
- **Merkle Tree** (Whitelist)

---

## 📁 Project Structure

```bash
NFT-Smart-Contract/
├── contracts/
│   └── EliteNFT.sol
├── scripts/
│   ├── deploy.js
│   ├── generate-merkle-root.js
│   ├── mint.js
│   ├── airdrop.js
│   ├── update-uri.js
│   └── verify.js
├── test/
│   ├── EliteNFT.test.js
│   └── fixtures.js
├── utils/
│   └── merkle.js
├── deployments/
├── metadata/                  # Generated metadata JSONs
├── .env.example
├── .github/workflows/ci.yml
├── hardhat.config.js
├── README.md
├── LICENSE
└── package.json
```

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Ashfaque965/NFT-Smart-Contract.git
cd NFT-Smart-Contract
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment
```bash
cp .env.example .env
```

Fill in your credentials in `.env`:
- `SEPOLIA_RPC_URL`
- `PRIVATE_KEY`
- `ETHERSCAN_API_KEY`

### 4. Compile & Test
```bash
npm run compile
npm test
```

### 5. Deploy to Sepolia
```bash
npm run deploy:sepolia
```

---

## 📋 Available Scripts

| Command                        | Description                              |
|-------------------------------|------------------------------------------|
| `npm run compile`             | Compile smart contracts                  |
| `npm test`                    | Run full test suite                      |
| `npm run deploy:sepolia`      | Deploy to Sepolia Testnet                |
| `npm run generate:merkle`     | Generate Merkle Root for whitelist       |
| `npx hardhat run scripts/mint.js` | Test minting                       |
| `npx hardhat run scripts/airdrop.js` | Perform airdrop                   |
| `npx hardhat verify`          | Verify contract on Etherscan             |

---

## 🔑 How to Use

### 1. Generate Whitelist Merkle Root
```bash
npm run generate:merkle
```

### 2. Deploy Contract
```bash
npm run deploy:sepolia
```

### 3. Set Sale Phase
- `0` = Closed
- `1` = Presale (Whitelist)
- `2` = Public Sale

### 4. Reveal Collection
```bash
npx hardhat run scripts/update-uri.js --network sepolia
```

---

## 📊 Contract Features Overview

- **Max Supply**: 5000 NFTs
- **Default Mint Price**: 0.05 ETH
- **Max per Wallet**: 5
- **Royalty**: 7.5% (ERC2981)
- **Sale Phases**: Presale + Public

---

## 🛡️ Security & Best Practices

- Uses battle-tested libraries (OpenZeppelin + ERC721A)
- All critical functions protected with `onlyOwner`
- Reentrancy protection via OpenZeppelin patterns
- Gas optimized
- Thoroughly tested
- **Recommended**: Get a professional audit before mainnet launch

---

## 📄 Metadata Standard (OpenSea Compatible)

```json
{
  "name": "Elite NFT #1",
  "description": "A premium member of the EliteNFT Collection",
  "image": "ipfs://Qm.../1.png",
  "attributes": [
    { "trait_type": "Rarity", "value": "Legendary" },
    { "trait_type": "Background", "value": "Gold" }
  ]
}
```

---

## 📌 Deployment Checklist

- [ ] Deploy contract on testnet
- [ ] Verify contract on Etherscan
- [ ] Upload images to IPFS (Pinata / nft.storage)
- [ ] Generate and upload metadata
- [ ] Set Merkle Root (if using whitelist)
- [ ] Reveal collection
- [ ] Test minting
- [ ] Withdraw funds (if needed)

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**Ashfaque Quraishi**

- GitHub: [@Ashfaque965](https://github.com/Ashfaque965)

---

**Made with ❤️ for the Web3 Community**

```

---

