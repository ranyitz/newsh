import path from "path";
import tempy from "tempy";
import fs from "fs";
import launchTerminal from "./launchTerminal";

type Options = { env: Record<string, string> };

function commandWindows(script: string, options?: Options): void {
  const launchFilePath = path.join(tempy.directory(), "launchTerminal.bat");

  const environmentParams = [];

  if (options?.env) {
    const env = options.env;

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
  launchTerminal(launchFilePath);
}

export default function command(script: string, options?: Options): void {
  const isWindows = /^win/.test(process.platform);
  const cwd = process.cwd();

  if (isWindows) {
    return commandWindows(script, options);
  }

  const launchFilePath = path.join(tempy.directory(), "launchTerminal");
  const moveToDirCommand = `cd ${cwd};`;

  const environmentParams = [];

  if (options?.env) {
    const env = options.env;

    for (const paramKey in env) {
      environmentParams.push(`${paramKey}=${env[paramKey]} `);
    }
  }

  const scriptWithMovePrefix =
    moveToDirCommand + environmentParams.join("") + script;

  fs.writeFileSync(launchFilePath, scriptWithMovePrefix);

  // add execute permissions (-rwxr-xr-x)
  fs.chmodSync(launchFilePath, 0o751);

  launchTerminal(launchFilePath);
}
