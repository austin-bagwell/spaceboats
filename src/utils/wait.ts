export function wait(toWaitInSec: number) {
  console.log(`waiting ${toWaitInSec} seconds before next action`);
  return new Promise((resolve) => setTimeout(resolve, toWaitInSec * 1000));
}
