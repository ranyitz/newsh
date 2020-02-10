import path from "path";
import command from "./command";
import { Options } from "./normalize";
import { ErrorMessage } from "./utils";

export default function file(filePath: string, options: Options = {}): void {
  if (!path.isAbsolute(filePath)) {
    filePath = path.join(process.cwd(), filePath);
  }

  const extention = path.extname(filePath);

  switch (extention) {
    case "":
    case ".sh":
      command(`sh ${filePath}`, options);
      break;
    case ".js":
      command(`node ${filePath}`, options);
      break;
    default:
      throw new ErrorMessage(
        `extension ${extention} of file ${filePath} is not supported`
      );
  }
}
