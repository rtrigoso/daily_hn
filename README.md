# Bun CMD Line Executable Template
Base Bun runtime executable repository 

#### Built with:
- yargs

#### Includes:
- Git [hooks](https://www.atlassian.com/git/tutorials/git-hooks) to prevent formatting issues.
- Testing workflow with [github actions](https://docs.github.com/en/actions).

## Setup
Remove the suffix `.sample` from the `.env.sample` file and fill in the required env values.

### Hooks
To enable git hooks, create a symlink from the `git-hooks` directory to the hooks directory under the `.git` folder.

`ln -s $(pwd)/git-hooks/* .git/hooks`

### Github workflow
When creating a new pull request using the `main` branch as the target, github runs the `test` job. If all steps are successful, the `ready-to-merge` label is added to the pull request.

The `merge` job blocks merges if the `ready-to-merge` label is not present.

## Running Locally
This project uses yargs to set command line options. The example below outputs the help doc created by yargs.

```
bun index.ts --help

#
# Options:
#   --version  Show version number                                       [boolean]
#   --help     Show help                                                 [boolean]
#
```
