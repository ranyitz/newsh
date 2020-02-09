<p align="center"><img src="assets/newshell.gif" width="90%"/></p>

<h2 align="center">🐚 cross-platform library to execute commands in a new shells</h2>

> When you have many cli apps that takes the whole terminal, it's useful to run them all with a single command

## Features

- 👯‍♂️ Attempts to use the current terminal
- 🌏 Cross-platform
- 📄 Runs js files with node
- 🗃 Opens the new shell in current working directory
- 🎛 Supports spliting with `iterm2`

## CLI

#### Run a command in a new shell

> prints "hello world" in a new shell window

```sh
newshell "echo 'hello world'"
```

> The new shell will run in the same working directory.

```sh
# See for yourself 👀

newshell pwd
```

> You can run multiple shells

```sh
newshell "npx tsc --watch" "npx jest --watch"
```

### --split

Split the screen instead of opening a new tab/window

> Only works if you're using iterm2

```sh
newshell --split "echo hello"
```

### --splitDirection

Choose split direction (`vertically`/`horizontally`)

> defaults to `vertically`

### --terminalApp

Choose a specific terminal app to use (e.g. `iTerm.app`)

### --file

Executes a file in a new shell

```sh
newshell --file "./script.sh"
```

> Supports running node for javascript files

```sh
newshell --file "./script.js"
```

## Node API

### command

> has the same capabilities of the cli

```ts
command(script: string, options: Options): void
```

```ts
type Options = {
  env?: Record<string, string> = {};
  split?: boolean = false;
  splitDirection?: string = "verticaly";
  terminalApp?: string | undefined = $TERM_PROGRAM;
};
```

### file

> similar to --file

```ts
file(scriptPath: string): void
```

## Future

- Run npm scripts in a new terminal (and resolve bins from the `node_modules/.bin` directory)
- Controll the focus of the terminal window
- Pass environment parameters from the CLI
- Manage IPC with the other terminal window (similar to `child_process.fork`)

<p align="left"><img src="https://github.com/ranyitz/newshell/workflows/CI/badge.svg" alt="CI"/><p/>
