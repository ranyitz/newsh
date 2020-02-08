import path from "path";
import command from "./command";

export default function file(filePath: string): void {
  const absolutePath = path.join(process.cwd(), filePath);
  const extention = path.extname(absolutePath);

  switch (extention) {
    case "":
    case ".sh":
      command(`sh ${absolutePath}`);
      break;
    case ".js":
      command(`node ${absolutePath}`);
      break;
    default:
      throw new Error(
        `extension ${extention} of file ${absolutePath} is not supported`
      );
  }
}
