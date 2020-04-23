import path from "path";
import tempy from "tempy";
import fs from "fs";
import launchTerminal from "./launchTerminal";
import normalize, { Options } from "./normalize";
import { InitialOptions } from "./cli";

function commandWindows(script: string, options: Options): void {
  const launchFilePath = path.join(tempy.directory(), "launchTerminal.bat");

  const environmentParams = [];
  const { env } = options;

  if (env) {
    for (const paramKey in env) {
      if (paramKey.startsWith("npm_package_scripts_")) {
        environmentParams.push(`set ${paramKey}="${env[paramKey]}"`);
      } else {
        environmentParams.push(`set ${paramKey}=${env[paramKey]}`);
      }
    }
  }

  const batFile = `
@echo off
${environmentParams.join("\n")}
cmd.exe @cmd /k ${script}
pause
exit`;

  fs.writeFileSync(launchFilePath, batFile);
  fs.chmodSync(launchFilePath, 0o751);

  launchTerminal(launchFilePath, options);
}

// There is a bug when npm create environment params which contains `"`
// Usually when trying to take npm scripts which contains `\"` in them
// (e.g. VAR="npm_package_scripts_test_watch="tsc --watch"")
// They clash with the `"` used for the definition of the variable in bash
// This is a best effort to assign them by changing them to `'`
function escapeDoubleQuotes(value: string | undefined): string | undefined {
  return value?.replace(/"/g, `'`);
}

function commandUnix(script: string, options: Options): void {
  const launchFilePath = path.join(tempy.directory(), "launchTerminal");
  const { env, cd } = options;

  const environmentParams = [];

  if (env) {
    for (const paramKey in env) {
      if (env[paramKey]) {
        environmentParams.push(
          `${paramKey}="${escapeDoubleQuotes(env[paramKey])}" `
        );
      }
    }
  }

  const moveToDirCommand = `cd ${cd};`;

  const scriptWithMovePrefix =
    moveToDirCommand + environmentParams.join("") + script;

  fs.writeFileSync(launchFilePath, scriptWithMovePrefix);

  // add execute permissions (-rwxr-xr-x)
  fs.chmodSync(launchFilePath, 0o751);

  launchTerminal(launchFilePath, options);
}

export default function command(
  script: string,
  initialOptions: InitialOptions = {}
): void {
  const options = normalize(initialOptions);
  const isWindows = /^win/.test(process.platform);

  const nodeModulesBin = path.join(options.cwd, "node_modules", ".bin");

  if (fs.existsSync(nodeModulesBin)) {
    if (isWindows) {
      options.env.Path = `${nodeModulesBin}:${options.env.Path}`;
    } else {
      options.env.PATH = `${nodeModulesBin}:${options.env.PATH}`;
    }
  }

  if (!isWindows) {
    commandUnix(script, options);
  } else {
    commandWindows(script, options);
  }
}
