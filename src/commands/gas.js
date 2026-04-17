import { ethers } from "ethers";
import chalk from "chalk";
import ora from "ora";
import { getNetwork } from "../config.js";

export async function gasCommand(options) {
  const network = getNetwork(options.network);
  const spinner = ora("Fetching gas prices...").start();
  try {
    const provider = new ethers.JsonRpcProvider(network.rpcUrl);
    const fee = await provider.getFeeData();
    spinner.succeed(chalk.green("Gas data fetched"));
    console.log(`\n${chalk.bold("Network:")} ${chalk.yellow(network.name)}\n`);
    if (fee.gasPrice) {
      const gwei = parseFloat(ethers.formatUnits(fee.gasPrice, "gwei")).toFixed(4);
      console.log(`${chalk.bold("Gas Price:")}    ${chalk.green(`${gwei} Gwei`)}`);
      const transfer = parseFloat(ethers.formatEther(fee.gasPrice * 21000n)).toFixed(8);
      const erc20 = parseFloat(ethers.formatEther(fee.gasPrice * 65000n)).toFixed(8);
      console.log(`\n${chalk.bold.underline("Estimated Costs (zkLTC):")}`);
      console.log(`${chalk.bold("  ETH Transfer:")}   ${transfer} zkLTC`);
      console.log(`${chalk.bold("  ERC-20 TX:")}      ${erc20} zkLTC`);
    }
    if (fee.maxFeePerGas) console.log(`${chalk.bold("Max Fee:")}      ${parseFloat(ethers.formatUnits(fee.maxFeePerGas, "gwei")).toFixed(4)} Gwei`);
    console.log("");
  } catch (err) { spinner.fail(chalk.red("Failed")); console.error(chalk.dim(err.message)); process.exit(1); }
}
