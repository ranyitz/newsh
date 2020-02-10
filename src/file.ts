import path from "path";
import command from "./command";
import { Options } from "./normalize";
import { error } from "./cli";

export default function file(filePath: string, options: Options): void {
  const absolutePath = path.join(process.cwd(), filePath);
  const extention = path.extname(absolutePath);

  switch (extention) {
    case "":
    case ".sh":
      command(`sh ${absolutePath}`, options);
      break;
    case ".js":
      command(`node ${absolutePath}`, options);
      break;
    default:
      error(`extension ${extention} of file ${absolutePath} is not supported`);
  }
}
