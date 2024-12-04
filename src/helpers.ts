import { $ } from "zx";

export function execMergeGitAction(action: string) {
  const regList = [/^merge (\S+)/, /^pull \S+ (\S+)/];

  for (const item of regList) {
    const result = item.exec(action);
    if (result) {
      return result;
    }
  }
  return null;
}

export function ensureMergeFromBranch(action: string) {
  const result = execMergeGitAction(action);
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
