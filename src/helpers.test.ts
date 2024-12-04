import { describe, expect, it } from "vitest";
import { ensureMergeFromBranch } from "./helpers";

describe("ensureMergeFromBranch", () => {
  const examples = [
    { msg: "merge test", branch: "test" },
    { msg: "merge origin/test", branch: "origin/test" },
    { msg: "merge test --hello", branch: "test" },
    { msg: "merge origin/test --hello", branch: "origin/test" },
    { msg: "pull origin test", branch: "test" },
    { msg: "pull origin test --hello", branch: "test" },
  ];

  examples.forEach((item) => {
    it(item.msg, () => {
      expect(ensureMergeFromBranch(item.msg)).toBe(item.branch);
    });
  });
});
