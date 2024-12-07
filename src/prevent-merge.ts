import consola from "consola";

import { BranchLimits, testBranch, ensureCurrentBranch, ensureMergeFromBranch, execMergeGitAction } from "./helpers";
import { argv } from "zx";

const gitReflogAction = argv.action;

const blacklist: BranchLimits = ["test", "origin/test"];
const whitelist: BranchLimits = [/^mr\//];

export async function main() {
  if (!gitReflogAction) {
    return;
  }

  if (!execMergeGitAction(gitReflogAction)) {
    return;
  }

  consola.warn(`$GIT_REFLOG_ACTION: ${gitReflogAction}`);

  const currentBranch = await ensureCurrentBranch();
  if (testBranch(whitelist, currentBranch)) {
    consola.log(`Current branch: ${currentBranch} in whitelist`);
    return;
  }

  const mergeFromBranch = ensureMergeFromBranch(gitReflogAction);
  consola.log(`Parsed merge from branch: ${mergeFromBranch}`);

  if (testBranch(blacklist, mergeFromBranch)) {
    throw new Error(`Unexpected merge from the branch: ${mergeFromBranch}`);
  }
}

main().catch((err) => {
  consola.error(err);
  consola.info("╭──────────────────────────────────────");
  consola.info(`│ You should clean your workspace with:`);
  consola.info(`│     \`git merge --abort\``);
  consola.info(`│ And enure merge from branch correctly`);
  consola.info("╰──────────────────────────────────────");
  process.exit(1);
});
