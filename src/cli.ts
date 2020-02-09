import arg from "arg";
import chalk from "chalk";
import launchFileInNewTerminal from "./file";
import command, { Options } from "./command";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("../package.json");

const error = (message: string): string => chalk`{red ERROR:} ${message}`;

const args = arg(
  {
    // Types
    "--file": [String],
    "--help": Boolean,
    "--version": Boolean,
    "--split": Boolean,
    "--splitDirection": String,
    "--terminalApp": String,

    // Aliases
    "-v": "--version",
    "-h": "--help"
  },
  { permissive: false, argv: process.argv.slice(2) }
);

const help = chalk`
  {bold.magenta newsh} - Running files/scripts in a new shell
  
  {bold USAGE}
    {bold $} {cyan newsh} "npx jest" && yarn start
    {bold $} {cyan newsh} --file path/to/script
    {bold $} {cyan newsh} --split "npx tsc --watch"
    {bold $} {cyan newsh} --help
    {bold $} {cyan newsh} --version
  
  {bold OPTIONS}
    -h, --help        Shows this help message
    -v, --version     Displays the current version of newsh

    --split           split the screen instead of opening a new one (iTerm2 only)
    --splitDirection  Choose split direction (vertically|horizontally)
    --terminalApp     Choose a specific terminal app to use (e.g. iTerm.app)
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
  console.error(error("please provide a file/command to run"));
  process.exit(1);
}

const cliOptions: Options = {
  env: {},
  split: !!args["--splitDirection"] || args["--split"],
  splitDirection: args["--splitDirection"],
  terminalApp: args["--terminalApp"]
};

scripts?.forEach(script => command(script, cliOptions));
files?.forEach(launchFileInNewTerminal);
