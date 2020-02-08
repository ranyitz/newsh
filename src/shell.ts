import path from "path";
import tempy from "tempy";
import fs from "fs";
import launchTerminal from "./launchTerminal";

function shellWindows(script: string): void {
  const launchFilePath = path.join(tempy.directory(), "launchTerminal.bat");

  const batFile = `
@echo off
start cmd.exe @cmd /k ${script}
pause
exit`;

  fs.writeFileSync(launchFilePath, batFile);
  fs.chmodSync(launchFilePath, 0o751);
  launchTerminal(launchFilePath);
}

export default function shell(script: string): void {
  const isWindows = /^win/.test(process.platform);
  const cwd = process.cwd();

  if (isWindows) {
    return shellWindows(script);
  }

  const launchFilePath = path.join(tempy.directory(), "launchTerminal");
  const moveToDirCommand = `cd ${cwd};`;
  const scriptWithMovePrefix = moveToDirCommand + script;

  fs.writeFileSync(launchFilePath, scriptWithMovePrefix);

  // add execute permissions (-rwxr-xr-x)
  fs.chmodSync(launchFilePath, 0o751);

  launchTerminal(launchFilePath);
}
