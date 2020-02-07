import arg from "arg";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("../package.json");

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

const help = `
  newshell - Running files/scripts in a new shell
  
  USAGE
    $ newshell 
    $ newshell [pathToScript, ...]
    $ newshell --help
    $ newshell --version
  
  OPTIONS
    -h, --help       Shows this help message
    -v, --version    Displays the current version of newshell
`;

if (args["--help"]) console.log(help);
if (args["--version"]) console.log(pkg.version);
