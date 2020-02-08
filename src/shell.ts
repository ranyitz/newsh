import path from "path";
import tempy from "tempy";
import fs from "fs";
import launchTerminal from "./launchTerminal";

export default function shell(script: string): void {
  const isWindows = /^win/.test(process.platform);

  const launchFilePath = path.join(tempy.directory(), "launchTerminal");

  const cwd = process.cwd();

  let moveToDirCommand;

  if (isWindows) {
    moveToDirCommand = `dir ${cwd};`;
  } else {
    moveToDirCommand = `cd ${cwd};`;
  }

  const scriptWithMovePrefix = moveToDirCommand + script;

  fs.writeFileSync(launchFilePath, scriptWithMovePrefix);

  // add execute permissions (-rwxr-xr-x)
  fs.chmodSync(launchFilePath, 0o751);

  launchTerminal(launchFilePath);
}
