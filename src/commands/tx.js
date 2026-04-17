import { ethers } from "ethers";
import chalk from "chalk";
import ora from "ora";
import { getNetwork } from "../config.js";

export async function txCommand(hash, options) {
  const network = getNetwork(options.network);
  const spinner = ora("Looking up transaction...").start();
  try {
    const provider = new ethers.JsonRpcProvider(network.rpcUrl);
    const tx = await provider.getTransaction(hash);
    const receipt = await provider.getTransactionReceipt(hash);
    if (!tx) { spinner.fail(chalk.red("Not found")); process.exit(1); }
    spinner.succeed(chalk.green("Transaction found"));
    const status = receipt ? (receipt.status === 1 ? chalk.green("✓ Success") : chalk.red("✗ Failed")) : chalk.yellow("⏳ Pending");
    console.log(`\n${chalk.bold("Hash:")}    ${chalk.cyan(hash)}`);
    console.log(`${chalk.bold("Status:")}  ${status}`);
    console.log(`${chalk.bold("From:")}    ${tx.from}`);
    console.log(`${chalk.bold("To:")}      ${tx.to || "(contract creation)"}`);
    console.log(`${chalk.bold("Value:")}   ${chalk.green(`${ethers.formatEther(tx.value)} ${network.currency}`)}`);
    if (receipt) { console.log(`${chalk.bold("Block:")}   ${receipt.blockNumber}`); console.log(`${chalk.bold("Gas:")}     ${receipt.gasUsed}`); }
    console.log(`${chalk.bold("Explorer:")} ${chalk.dim(`${network.explorer}/tx/${hash}`)}\n`);
  } catch (err) { spinner.fail(chalk.red("Failed")); console.error(chalk.dim(err.message)); process.exit(1); }
}
