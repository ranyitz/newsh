import path from "path";
import command from "./command";
import { ErrorMessage } from "./utils";
import { InitialOptions } from "./cli";
import normalize from "./normalize";

export default function file(
  filePath: string,
  initialOptions: InitialOptions = {}
): void {
  const options = normalize(initialOptions);

  if (!path.isAbsolute(filePath)) {
    filePath = path.join(options.cwd, filePath);
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
