import path from "path";
import shell from "./shell";

export default function file(filePath: string): void {
  const absolutePath = path.join(process.cwd(), filePath);
  const extention = path.extname(absolutePath);

  switch (extention) {
    case "":
      shell(`sh ${absolutePath}`);
      break;
    case ".js":
      shell(`node ${absolutePath}`);
      break;
    case ".sh":
      shell(`sh ${absolutePath}`);
      break;
    default:
      throw new Error(
        `extension ${extention} of file ${absolutePath} is not supported`
      );
  }
}
