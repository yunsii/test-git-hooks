import { $ } from "zx";

export function execMergeGitMsg(msg: string) {
  const reg = /Merge branch '(.+?)'/im;
  return reg.exec(msg);
}

export function ensureMergeFromBranch(msg: string) {
  const result = execMergeGitMsg(msg);
  if (!result) {
    throw new Error("Parse merge from branch failed");
  }
  return result[1];
}

export type BranchLimits = (string | RegExp)[];

export function checkBranch(branches: BranchLimits, input: string) {
  return branches.some((item) => {
    if (typeof item === "string") {
      return item === input;
    }
    return item.test(input);
  });
}

export async function ensureCurrentBranch() {
  const currentBranchResult = await $`git rev-parse --abbrev-ref HEAD`;
  const currentBranch = currentBranchResult.stdout.trim();

  if (!currentBranch) {
    throw new Error("Parse current branch failed");
  }

  return currentBranch;
}
