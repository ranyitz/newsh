import path from "path";
import tempy from "tempy";
import fs from "fs";
import launchTerminal from "./launchTerminal";

export default function shell(script: string): void {
  const launchFilePath = path.join(tempy.directory(), "launchTerminal");
  fs.writeFileSync(launchFilePath, script);

  // add execute permissions (-rwxr-xr-x)
  fs.chmodSync(launchFilePath, 0o751);

  launchTerminal(launchFilePath);
}
