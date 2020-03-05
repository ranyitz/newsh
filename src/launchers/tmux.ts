import path from "path";
import execa from "execa";
import { Launcher } from "./";

export const tmux: Launcher = (execFilePath, options) => {
  const tmuxSplitDirection =
    options.splitDirection === "vertically" ? "h" : "v";

  execa.sync(path.join(__dirname, "../../scripts/tmux.sh"), [execFilePath], {
    ...options.env,
    env: {
      __SPLIT_DIRECTION__: tmuxSplitDirection,
      __CMD__: execFilePath,
      __CD__: options.cd
    }
  });
};
