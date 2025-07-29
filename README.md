<p align="center">
  <img src="./public/jagantara_icon.png" alt="Jagantara Logo" width="120" />
</p>

<h1 align="center">Jagantara</h1>

**Jagantara** is a decentralized application (dApp) platform built with **Next.js**, **TypeScript**, and **Tailwind CSS**, offering a seamless interface to interact with smart contracts, governance systems, and DeFi protocols. Designed with extensibility in mind, Jagantara integrates the **Model Context Protocol (MCP)** to enable intelligent automation, AI assistants, and modular tool execution.

Jagantara incorporates **Morpho** to hedge against inflation and adopts a **Synthetix-inspired staking model** that offers flexible, user-controlled staking and unstaking.

---

## 🚀 Features

- **🔐 Staking**
  Stake and unstake tokens at any time using a fluid, Synthetix-like model.

- **🗳️ JagaDAO Governance**
  Decentralized voting system for community-driven decisions and insurance claim approvals.

- **📜 Decentralized Insurance**
  File, process, and verify claims through DAO logic on-chain.

- **📢 Campaign Platform**
  Launch verifiable campaigns from trusted partners, boosting transparency and engagement.

- **🏦 Vaults**
  Manage on-chain assets in vaults — enhanced with inflation protection via **Morpho**.

- **🤖 Jagabot (AI Assistant)**
  AI-powered assistant for onboarding, user support, and automation via MCP.

- **🔧 Model Context Protocol (MCP)**
  Tool execution and automation layer powered by a local MCP server and SDK integration.

- **📉 Inflation Hedging**
  Integrates with **Morpho** to protect user assets against value erosion.

---

## 🧱 Tech Stack

| Layer          | Tools & Frameworks                      |
| -------------- | --------------------------------------- |
| **Frontend**   | Next.js, React, TypeScript              |
| **Styling**    | Tailwind CSS, custom CSS                |
| **Blockchain** | Foundry, Solidity, Ponder, Ethers.js    |
| **Automation** | Model Context Protocol (MCP), Gemini AI |
| **Wallets**    | Wagmi, Xellar                           |

---
Jagantara Contract on Lisk Sepolia:

- USDC 
https://sepolia-blockscout.lisk.com/token/0xA2D17a5CAEbEC48a32fF945aAF5471Eb9b989345?tab=contract

- JagaToken
https://sepolia-blockscout.lisk.com/token/0x529bB304E550E21938c20D1E27EAa4EE0dB549E6?tab=contract

- Insurance Manager
https://sepolia-blockscout.lisk.com/address/0x3A70a20d10381447B5c1DaB62fDcE23Df9079A8E?tab=contract

- Jaga Stake
https://sepolia-blockscout.lisk.com/address/0x65165BFb8162744E1C5251c1deB196bB270fE1eE?tab=contract

- Morpho
https://sepolia-blockscout.lisk.com/address/0xFDe181Ca94A77c3C0Bdf225963725a8E4680ADcF?tab=contract

- Claim Manager
https://sepolia-blockscout.lisk.com/address/0x72aE49071e641e38350EFbE4511C70C119E48875?tab=contract

- DAO Governance
https://sepolia-blockscout.lisk.com/address/0x43C67E463C7a9aF76c52194A095E69c35edEaAeA?tab=contract

- Morpho Re-invest
https://sepolia-blockscout.lisk.com/address/0xb09e395a600eA5848f9aE593538F2C584aE23773?tab=contract

---

## ⚙️ Getting Started

### 📦 Prerequisites

- Node.js **v18+**
- npm or yarn
- (Optional) MCP-compatible local tools or external APIs

---

## 🛠 Installation & Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/Jagantara/jagantara.git
cd jagantara
npm install  # or yarn install
```

---

### 🔧 Start MCP Server (Required for Tooling & Jagabot)

The MCP server is required for executing context-aware tools and AI workflows.

Build and start MCP locally:

```bash
# Build MCP server code
npm run build:mcp

# Start the MCP server
npm run start:mcp
```

Or run both steps in one:

```bash
npm run dev:mcp
```

> 📂 MCP server code lives in: `src/dist/mcp/mcp-server.js`
> 📁 MCP client implementation: `src/lib/mcp/mcp-client.ts`

---

### 🧪 Start Local Development Server

Once the MCP server is running, launch the Next.js frontend:

```bash
npm run dev  # or yarn dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

### 📦 Build for Production

```bash
npm run build
npm start
```

---

## 🧠 MCP Integration

The **Model Context Protocol (MCP)** enables Jagantara to discover and execute external tools, enabling:

- AI assistant workflows via Jagabot
- On-demand staking, governance, and vault actions
- Tool resolution using LLMs and local context

Client path:

```ts
src / lib / mcp / mcp - client.ts;
```

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🤝 Contributing

We welcome contributions from the community!
Please open issues or submit pull requests to help improve Jagantara.

---

## 🔗 Links & Resources

- [Morpho Docs](https://docs.morpho.org/)
- [Model Context Protocol](https://github.com/modelcontext/protocol)
- [Next.js Docs](https://nextjs.org/)
- [Foundry Book](https://book.getfoundry.sh/)
- [Wagmi + Reown AppKit](https://wagmi.sh/)

---
