# newshell

Open a new shell window

> When you have many cli apps that takes the whole terminal, it's useful to run them all with a single command

![newshell](assets/newshell.gif)

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
