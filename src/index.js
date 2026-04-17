#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import { balanceCommand } from "./commands/balance.js";
import { txCommand } from "./commands/tx.js";
import { blockCommand } from "./commands/block.js";
import { gasCommand } from "./commands/gas.js";
import { sendCommand } from "./commands/send.js";
import { bridgeCommand } from "./commands/bridge.js";

console.log(chalk.bold.cyan("\n  ⚡ LitVM Tools") + chalk.dim(" — CLI for the first EVM rollup on Litecoin\n"));

const program = new Command();
program.name("litvm").description("CLI toolkit for LitVM").version("1.0.0");

program.command("balance <address>").description("Get zkLTC balance").option("-n, --network <network>", "testnet | mainnet", "testnet").action(balanceCommand);
program.command("tx <hash>").description("Look up transaction").option("-n, --network <network>", "testnet | mainnet", "testnet").action(txCommand);
program.command("block [number]").description("Get block info (default: latest)").option("-n, --network <network>", "testnet | mainnet", "testnet").action(blockCommand);
program.command("gas").description("Gas prices & cost estimates").option("-n, --network <network>", "testnet | mainnet", "testnet").action(gasCommand);
program.command("send <to> <amount>").description("Send zkLTC").option("-n, --network <network>", "testnet | mainnet", "testnet").option("-k, --key <privateKey>", "private key").action(sendCommand);
program.command("bridge").description("Bridge status").option("-n, --network <network>", "testnet | mainnet", "testnet").action(bridgeCommand);

if (!process.argv.slice(2).length) program.outputHelp();
else program.parse(process.argv);
