<p align=center>
  <img src="https://img.shields.io/badge/cross--platform-windows%20%7C%20macos%20%7C%20linux-yellow" alt="size"/>
  <img src="https://img.shields.io/github/languages/top/ranyitz/newsh" alt="size"/>
  <img src="https://img.shields.io/npm/v/newsh" alt="version"/>
  <img src="https://img.shields.io/github/license/ranyitz/newsh" alt="license"/>
  <img src="https://badgen.net/bundlephobia/minzip/newsh" alt="size"/>
  <img src="https://github.com/ranyitz/newsh/workflows/CI/badge.svg" alt="CI"/>
</p>
<p align="center"><img src="assets/newsh-iterm.gif" width="90%"/></p>

<h2 align="center">🐚 cross-platform library to execute commands in a new shells</h2>

> When you have many cli apps that takes the whole terminal, it's useful to run them all with a single command

## Features

- 👯‍♂️ Attempts to use the current terminal
- 🌏 Cross-platform
- 📄 Runs js files with node
- 🗃 Opens the new shell in current working directory
- 🎛 Supports spliting (`iterm2`/`tmux`)
- 🌴 Pass environment parameters to the new shell instance

## CLI

#### Run a command in a new shell

> prints "hello world" in a new shell window

```sh
newsh "echo 'hello world'"
```

> The new shell will run in the same working directory.

```sh
# See for yourself 👀

newsh pwd
```

> You can run multiple shells

```sh
newsh "tsc --watch" "jest --watch"
```

> Note that you can use `tsc`, `jest` and any other local bin just like in npm/yarn scripts

<p align="center"><img src="assets/newsh-tmux.gif" width="94%"/></p>

### --split-horizontally

Attempts to split the screen horizontally instead of opening a new tab/window

```sh
newsh --split-horizontally "echo hello"
```

### --split-vertically

Attempts to split the screen vertically instead of opening a new tab/window

```sh
newsh --split-vertically "echo hello"
```

### --split

Alias for `--split-vertically`

### --terminalApp

Choose a specific terminal app to use (e.g. `iTerm.app`)

### --file

Executes a file in a new shell

```sh
newsh --file "./script.sh"
```

> Supports running node for javascript files

```sh
newsh --file "./script.js"
```

## Node API

> possible options for the command and file methods

```ts
type Options = {
  env?: Record<string, string> = {};
  split?: boolean = false;
  splitDirection?: "vertically" | "horizontally" = "vertically";
  terminalApp?: string | undefined = $TERM_PROGRAM;
};
```

### command

> Run a command in a new shell

```ts
command(script: string, options: Options): void
```

### file

> Executes a file in a new shell

```ts
file(scriptPath: string, options: Options): void
```

## Future

- Controll the focus of the terminal window
- Manage IPC with the other terminal window (similar to `child_process.fork`)
