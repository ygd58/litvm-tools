import { ethers } from "ethers";
import chalk from "chalk";
import ora from "ora";
import { getNetwork } from "../config.js";

export async function sendCommand(to, amount, options) {
  const network = getNetwork(options.network);
  const privateKey = options.key || process.env.LITVM_PRIVATE_KEY;
  if (!privateKey) { console.error(chalk.red("Private key required: --key or LITVM_PRIVATE_KEY")); process.exit(1); }
  if (!ethers.isAddress(to)) { console.error(chalk.red(`Invalid address: ${to}`)); process.exit(1); }
  const spinner = ora(`Sending ${amount} ${network.currency}...`).start();
  try {
    const provider = new ethers.JsonRpcProvider(network.rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    const valueWei = ethers.parseEther(amount);
    const balance = await provider.getBalance(wallet.address);
    if (balance < valueWei) { spinner.fail(chalk.red(`Insufficient balance: ${ethers.formatEther(balance)} zkLTC`)); process.exit(1); }
    spinner.text = "Broadcasting...";
    const tx = await wallet.sendTransaction({ to, value: valueWei });
    spinner.text = `Confirming (${tx.hash.slice(0, 10)}...)`;
    const receipt = await tx.wait();
    spinner.succeed(chalk.green("Confirmed!"));
    console.log(`\n${chalk.bold("Hash:")}   ${chalk.cyan(tx.hash)}`);
    console.log(`${chalk.bold("From:")}   ${wallet.address}`);
    console.log(`${chalk.bold("To:")}     ${to}`);
    console.log(`${chalk.bold("Amount:")} ${chalk.green(`${amount} ${network.currency}`)}`);
    console.log(`${chalk.bold("Block:")}  ${receipt.blockNumber}`);
    console.log(`${chalk.bold("Explorer:")} ${chalk.dim(`${network.explorer}/tx/${tx.hash}`)}\n`);
  } catch (err) { spinner.fail(chalk.red("Failed")); console.error(chalk.dim(err.message)); process.exit(1); }
}
