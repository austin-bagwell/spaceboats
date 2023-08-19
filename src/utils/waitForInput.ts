import * as readline from "node:readline/promises";

export async function waitForUserInput(prompt: string, callback: any) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const userInput = await rl.question(prompt, callback);
  return userInput;
}
