# litvm-tools

CLI toolkit for **LitVM** — the first trustless EVM rollup on Litecoin.

---

## Requirements

- Node.js v18+
- npm v8+
- Git

## Installation

```bash
git clone https://github.com/ygd58/litvm-tools
cd litvm-tools
npm install
npm link
```

## Verify

```bash
litvm --help
```

## Configuration

```bash
export LITVM_RPC_URL=https://rpc-testnet.litvm.com
export LITVM_PRIVATE_KEY=your_private_key
```

## Commands

| Command | Description |
|---------|-------------|
| `litvm balance <address>` | Get zkLTC balance |
| `litvm tx <hash>` | Look up transaction |
| `litvm block [number]` | Get block info (default: latest) |
| `litvm gas` | Gas prices and cost estimates |
| `litvm send <to> <amount>` | Send zkLTC |
| `litvm bridge` | Bridge status |

## Network

> LitVM testnet RPC will be published at launch.
> Follow [@LitecoinVM](https://twitter.com/LitecoinVM) for updates.

## Built By

- [ygd58](https://github.com/ygd58)
- [Neturionglobal](https://github.com/neturionglobal)

## Links

- [LitVM Docs](https://docs.litvm.com)
- [Builders Program](https://builders.litvm.com)

## License

MIT