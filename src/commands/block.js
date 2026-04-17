import { ethers } from "ethers";
import chalk from "chalk";
import ora from "ora";
import { getNetwork } from "../config.js";

export async function blockCommand(blockArg, options) {
  const network = getNetwork(options.network);
  const blockId = blockArg || "latest";
  const spinner = ora(`Fetching block ${blockId}...`).start();
  try {
    const provider = new ethers.JsonRpcProvider(network.rpcUrl);
    const block = await provider.getBlock(blockId === "latest" ? "latest" : parseInt(blockId, 10));
    spinner.succeed(chalk.green("Block fetched"));
    const ts = new Date(Number(block.timestamp) * 1000).toISOString();
    console.log(`
${chalk.bold("Block #:")}      ${chalk.cyan(block.number)}`);
    console.log(`${chalk.bold("Network:")}      ${chalk.yellow(network.name)}`);
    console.log(`${chalk.bold("Hash:")}         ${chalk.dim(block.hash)}`);
    console.log(`${chalk.bold("Timestamp:")}    ${ts}`);
    console.log(`${chalk.bold("Transactions:")} ${chalk.green(block.transactions.length)}`);
    console.log(`${chalk.bold("Gas Used:")}     ${block.gasUsed}`);
    console.log(`${chalk.bold("Miner:")}        ${block.miner}
`);
  } catch (err) { spinner.fail(chalk.red("Failed")); console.error(chalk.dim(err.message)); process.exit(1); }
}
