import consola from "consola";

import { BranchLimits, checkBranch, ensureCurrentBranch, ensureMergeFromBranch, execMergeGitAction } from "./helpers";
import { argv } from "zx";

const gitReflogAction = argv.action;

const preventedBranches: BranchLimits = ["test", "origin/test"];
const whitelistBranches: BranchLimits = [/^mr\//];

export async function main() {
  if (!gitReflogAction) {
    return;
  }

  if (!execMergeGitAction(gitReflogAction)) {
    return;
  }

  consola.log(`$GIT_REFLOG_ACTION: ${gitReflogAction}`);

  const currentBranch = await ensureCurrentBranch();
  if (checkBranch(whitelistBranches, currentBranch)) {
    consola.log(`Current branch: $currentBranch} in whitelist`);
    return;
  }

  const mergeFromBranch = ensureMergeFromBranch(gitReflogAction);
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
