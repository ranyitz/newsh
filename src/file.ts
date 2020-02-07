import path from "path";
import shell from "./shell";
import launchTerminal from "./launchTerminal";

export default function file(filePath: string): void {
  const absolutePath = path.join(process.cwd(), filePath);
  const extention = path.extname(absolutePath);

  switch (extention) {
    case "":
      launchTerminal(absolutePath);
      break;
    case ".js":
      shell(`/usr/bin/env node ${absolutePath}`);
      break;
    case ".sh":
      shell(`/usr/bin/env sh ${absolutePath}`);
      break;
    default:
      throw new Error(
        `extension ${extention} of file ${absolutePath} is not supported`
      );
  }
}
