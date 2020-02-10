import path from "path";
import tempy from "tempy";
import fs from "fs";
import launchTerminal from "./launchTerminal";
import { Options } from "./normalize";

function commandWindows(script: string, options: Options): void {
  const launchFilePath = path.join(tempy.directory(), "launchTerminal.bat");

  const environmentParams = [];
  const { env } = options;

  if (env) {
    for (const paramKey in env) {
      environmentParams.push(`set ${paramKey}=${env[paramKey]}`);
    }
  }

  const batFile = `
@echo off
${environmentParams.join("\n")}
start cmd.exe @cmd /k ${script}
pause
exit`;

  fs.writeFileSync(launchFilePath, batFile);
  fs.chmodSync(launchFilePath, 0o751);

  launchTerminal(launchFilePath, options);
}

function commandUnix(script: string, options: Options): void {
  const launchFilePath = path.join(tempy.directory(), "launchTerminal");

  const environmentParams = [];
  const { env } = options;

  if (env) {
    for (const paramKey in env) {
      if (env[paramKey]) {
        environmentParams.push(`${paramKey}="${env[paramKey]}" `);
      }
    }
  }

  const moveToDirCommand = `cd ${process.cwd()};`;

  const scriptWithMovePrefix =
    moveToDirCommand + environmentParams.join("") + script;

  fs.writeFileSync(launchFilePath, scriptWithMovePrefix);

  // add execute permissions (-rwxr-xr-x)
  fs.chmodSync(launchFilePath, 0o751);

  launchTerminal(launchFilePath, options);
}

export default function command(script: string, options: Options = {}): void {
  const isWindows = /^win/.test(process.platform);

  if (!isWindows) {
    commandUnix(script, options);
  } else {
    commandWindows(script, options);
  }
}
