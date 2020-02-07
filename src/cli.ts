import arg from "arg";
import chalk from "chalk";
import launchFileInNewTerminal from "./file";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("../package.json");

const error = (message: string): string => chalk`{red ERROR:} ${message}`;

const args = arg(
  {
    // Types
    "--help": Boolean,
    "--version": Boolean,

    // Aliases
    "-v": "--version",
    "-h": "--help"
  },
  { permissive: false, argv: process.argv.slice(2) }
);

const help = chalk`
  {bold.magenta newshell} - Running files/scripts in a new shell
  
  {bold USAGE}
    {bold $} {cyan newshell} [pathToScript, ...]
    {bold $} {cyan newshell} --help
    {bold $} {cyan newshell} --version
  
  {bold OPTIONS}
    -h, --help       Shows this help message
    -v, --version    Displays the current version of newshell
`;

if (args["--help"]) {
  console.log(help);
  process.exit(0);
}

if (args["--version"]) {
  console.log(pkg.version);
  process.exit(0);
}

if (args._.length === 0) {
  console.error(error("please provide at least one file to run"));
  process.exit(1);
}

const files = args._;

files.forEach(launchFileInNewTerminal);
