process.on("uncaughtException", error => {
  if (process.env.DEBUG === "true") {
    throw error;
  }

  console.error(error.message);
});

import arg from "arg";
import chalk from "chalk";
import launchFileInNewTerminal from "./file";
import command from "./command";
import { ErrorMessage } from "./utils";
import fs from "fs";

export type InitialOptions = {
  env?: NodeJS.ProcessEnv;
  cwd?: string | undefined;
  cd?: string | undefined;
  splitDirection?: string | undefined;
  split?: boolean | undefined;
  terminalApp?: string | undefined;
  terminalAppSetup?: string | undefined;
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("../package.json");

const args = arg(
  {
    // Types
    "--file": [String],
    "--help": Boolean,
    "--version": Boolean,
    "--split-horizontally": Boolean,
    "--split-vertically": Boolean,
    "--terminalApp": String,
    "--terminalAppSetup": String,
    "--cd": String,

    // Aliases
    "-v": "--version",
    "-h": "--help",
    "--split": "--split-vertically"
  },
  { permissive: false, argv: process.argv.slice(2) }
);

const help = chalk`
  {bold.magenta newsh} - [${pkg.version}] Running files/scripts in a new shell

  {bold USAGE}
    {bold $} {cyan newsh} "npx jest --watch" && yarn start
    {bold $} {cyan newsh} --file path/to/script
    {bold $} {cyan newsh} --split "npx jest --watch"
    {bold $} {cyan newsh} --split-horizontally "npx tsc --watch"
    {bold $} {cyan newsh} --cd ~
    {bold $} {cyan newsh} --help
    {bold $} {cyan newsh} --version
  
  {bold OPTIONS}
    -h, --help              Shows this help message
    -v, --version           Displays the current version of newsh
  
    --split-vertically      Split the screen vertically instead of opening a new one (iTerm2 & tmux only)
    --split-horizontally    Split the screen horizontally instead of opening a new one (iTerm2 & tmux only)
    --split                 Alias for --split-vertically
    --terminalApp           Choose a specific terminal app to use (e.g. iTerm.app)
    --terminalAppSetup      The arguments to pass a file to execute, use \{\{file\}\} for file argument
    --cd                    Open the new shell in the specified directory
`;

if (args["--help"]) {
  console.log(help);
  process.exit(0);
}

if (args["--version"]) {
  console.log(pkg.version);
  process.exit(0);
}

const files = args["--file"];
const scripts = args._;

if ((!files || files?.length === 0) && (!scripts || scripts?.length === 0)) {
  throw new ErrorMessage("please provide a file/command to run");
}

const splitDirection = args["--split-vertically"]
  ? "vertically"
  : args["--split-horizontally"]
  ? "horizontally"
  : undefined;

let optionsFromFile: InitialOptions = {};
try {
  optionsFromFile = JSON.parse(fs.readFileSync("./.newsh.json").toString());
} catch (e) {}

const initialOptions: InitialOptions = {
  env: {},
  cwd: undefined,
  cd: args["--cd"] || optionsFromFile.cd,
  split: !!(splitDirection || optionsFromFile.splitDirection),
  splitDirection: splitDirection || optionsFromFile.splitDirection,
  terminalApp: args["--terminalApp"] || optionsFromFile.terminalApp,
  terminalAppSetup:
    args["--terminalAppSetup"] || optionsFromFile.terminalAppSetup
};

scripts?.forEach(script => command(script, initialOptions));
files?.forEach(filePath => launchFileInNewTerminal(filePath, initialOptions));
