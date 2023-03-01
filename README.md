Test Git Hooks

> Git Hooks 官方文档：https://git-scm.com/docs/githooks

## 备忘录

代码提交和合并**默认**都会进过以下两个 hook

- prepare-commit-msg
- commit-msg

值得注意的是，在代码合并时，如果 Git 能自动处理则在以上两个 hook 中拿到的文件路径为 `.git/MERGE_MSG`，
prepare-commit-msg 第二个参数为 `merge`。

## Hooks

### applypatch-msg

### pre-applypatch

### post-applypatch

### [pre-commit](https://git-scm.com/docs/githooks#_pre_commit)

### [pre-merge-commit](https://git-scm.com/docs/githooks#_pre_merge_commit)

### [prepare-commit-msg](https://git-scm.com/docs/githooks#_prepare_commit_msg)

### [commit-msg](https://git-scm.com/docs/githooks#_commit_msg)

### post-commit

### pre-rebase

### pre-rebase

### post-checkout

### post-merge

### pre-push

### pre-receive

### update

### proc-receive

### post-receive

### post-update

### reference-transaction

### push-to-checkout

### pre-auto-gc

### post-rewrite

### sendemail-validate

### fsmonitor-watchman

### p4-changelist

### p4-prepare-changelist

### p4-post-changelist

### p4-pre-submit

### post-index-change

test
