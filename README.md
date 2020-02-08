<p align="left"><img src="https://github.com/ranyitz/newshell/workflows/CI/badge.svg" alt="CI"/><p/>

<p align="center"><img src="assets/newshell.gif" width="90%"/></p>

<h2 align="center">Open a new shell window</h2>

> When you have many cli apps that takes the whole terminal, it's useful to run them all with a single command

## Features

- 👯‍♂️ Attempts to use the current terminal which is being used
- 🌏 Cross platform
- 📄 Runs js files with node
- 🗃 Opens the new shell in current working directory

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

### --file

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
command(script: string): void
```

> similar to --file

### file

```ts
file(scriptPath: string): void
```

## Future

- Run npm scripts in a new terminal (and resolve bins from the `node_modules/.bin` directory)
- Manage IPC with the other terminal window (similar to `child_process.fork`)
