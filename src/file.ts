import path from "path";
import shell from "./shell";
import launchTerminal from "./launchTerminal";

export default function file(filePath: string): void {
  const extention = path.extname(filePath);

  switch (extention) {
    case "":
      launchTerminal(filePath);
      break;
    case ".js":
      shell(`/usr/bin/env node ${filePath}`);
      break;
    case ".sh":
      shell(`/usr/bin/env sh ${filePath}`);
      break;
    default:
      throw new Error(
        `extension ${extention} of file ${filePath} is not supported`
      );
  }
}
