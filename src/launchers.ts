import execa from "execa";
import path from "path";
import { Options } from "./normalize";

export type Launcher = (execFilePath: string, options: Options) => void;

export const windows: Launcher = execFilePath => {
  execa.sync("cmd.exe", ["/C", execFilePath], {
    detached: true,
    stdio: "ignore"
  });
};

export const linux: Launcher = (execFilePath, options) => {
  try {
    execa.sync(options.terminalApp!, ["-e", `sh ${execFilePath}`], {
      detached: true
    });
  } catch (error) {
    execa.sync("sh", [execFilePath]);
  }
};

export const mac: Launcher = (execFilePath, options) => {
  try {
    execa.sync("open", ["-a", options.terminalApp!, execFilePath]);
  } catch (error) {
    execa.sync("open", [execFilePath]);
  }
};

export const iterm: Launcher = (execFilePath, options) => {
  try {
    execa.sync(path.join(__dirname, "../scripts/iterm.sh"), [execFilePath], {
      ...options.env,
      env: { SPLIT_DIRECTION: options.splitDirection }
    });
    return;
  } catch (error) {
    mac(execFilePath, options);
  }
};

export const tmux: Launcher = (execFilePath, options) => {
  try {
    const tmuxSplitDirection =
      options.splitDirection === "vertically" ? "h" : "v";

    execa.sync(path.join(__dirname, "../scripts/tmux.sh"), [execFilePath], {
      ...options.env,
      env: { SPLIT_DIRECTION: tmuxSplitDirection }
    });
    return;
  } catch (error) {
    if (options.terminalApp === "iTerm.app") {
      iterm(execFilePath, options);
    } else {
      mac(execFilePath, options);
    }
  }
};
