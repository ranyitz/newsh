import path from "path";
import execa from "execa";
import { Launcher } from "./";

export const iterm: Launcher = (execFilePath, options) => {
  execa.sync(path.join(__dirname, "../../scripts/iterm.sh"), [execFilePath], {
    ...options.env,
    env: {
      __SPLIT_DIRECTION__: options.splitDirection,
      __CMD__: execFilePath,
      __CD__: options.cd
    }
  });
};
