import { ethers } from "ethers";
import chalk from "chalk";
import ora from "ora";
import { getNetwork } from "../config.js";

export async function balanceCommand(address, options) {
  const network = getNetwork(options.network);
  const spinner = ora(`Fetching balance on ${network.name}...`).start();
  try {
    const provider = new ethers.JsonRpcProvider(network.rpcUrl);
    if (!ethers.isAddress(address)) { spinner.fail(chalk.red(`Invalid address: ${address}`)); process.exit(1); }
    const bal = ethers.formatEther(await provider.getBalance(address));
    spinner.succeed(chalk.green("Balance fetched"));
    console.log(`\n${chalk.bold("Address:")} ${chalk.cyan(address)}`);
    console.log(`${chalk.bold("Network:")} ${chalk.yellow(network.name)}`);
    console.log(`${chalk.bold("Balance:")} ${chalk.green(`${bal} ${network.currency}`)}`);
    console.log(`${chalk.bold("Explorer:")} ${chalk.dim(`${network.explorer}/address/${address}`)}\n`);
  } catch (err) { spinner.fail(chalk.red("Failed")); console.error(chalk.dim(err.message)); process.exit(1); }
}
