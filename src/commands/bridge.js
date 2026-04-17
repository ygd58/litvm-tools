import { ethers } from "ethers";
import chalk from "chalk";
import ora from "ora";
import { getNetwork } from "../config.js";

export async function bridgeCommand(options) {
  const network = getNetwork(options.network);
  const spinner = ora(`Fetching bridge status on ${network.name}...`).start();
  try {
    const provider = new ethers.JsonRpcProvider(network.rpcUrl);
    const block = await provider.getBlock("latest");
    spinner.succeed(chalk.green("RPC connected"));
    console.log(`\n${chalk.bold("Network:")}      ${chalk.yellow(network.name)}`);
    console.log(`${chalk.bold("Latest Block:")} ${chalk.cyan(block ? block.number : "unknown")}`);
    console.log(`${chalk.bold("Currency:")}     ${chalk.green(network.currency)}`);
    console.log(`${chalk.bold("Bridge:")}       ${chalk.dim(network.bridge)}`);
    console.log(`${chalk.bold("Explorer:")}     ${chalk.dim(network.explorer)}\n`);
  } catch (err) {
    spinner.fail(chalk.red("RPC not available yet"));
    console.log(chalk.dim("\nLitVM testnet RPC will be published at launch."));
    console.log(chalk.dim("Follow @LitecoinVM for updates.\n"));
    process.exit(1);
  }
}
