import { argv } from "zx";
import consola from "consola";

import { BranchLimits, checkBranch, ensureCurrentBranch, ensureMergeFromBranch, execMergeGitMsg } from "./helpers";

const gitMsg = argv.msg;

const preventedBranches: BranchLimits = ["test"];
const whitelistBranches: BranchLimits = [/^mr\//];

export async function main() {
  if (typeof gitMsg !== "string") {
    return;
  }

  if (!execMergeGitMsg(gitMsg)) {
    return;
  }

  consola.log(`Merge commit message: ${gitMsg}`);

  const currentBranch = await ensureCurrentBranch();
  if (checkBranch(whitelistBranches, currentBranch)) {
    consola.log(`Current branch: $currentBranch} in whitelist`);
    return;
  }

  const mergeFromBranch = ensureMergeFromBranch(gitMsg);
  consola.log(`Parsed merge from branch: ${mergeFromBranch}`);

  if (checkBranch(preventedBranches, mergeFromBranch)) {
    throw new Error(`Unexpected merge from the brach: ${mergeFromBranch}`);
  }
}

main().catch((err) => {
  consola.error(err);
  consola.info("┌──────────────────────────────────────");
  consola.info(`│ You should clean your workspace with:`);
  consola.info(`│     \`git merge --abort\``);
  consola.info(`│ And enure merge from branch correctly`);
  consola.info("└──────────────────────────────────────");
  process.exit(1);
});
