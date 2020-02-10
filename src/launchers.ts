import execa from "execa";
import path from "path";
import { Options } from "./normalize";

export const windows = (execFilePath: string): void => {
  execa.sync("cmd.exe", ["/C", execFilePath], {
    detached: true,
    stdio: "ignore"
  });
};

export const linux = (execFilePath: string, options: Options): void => {
  try {
    execa.sync(options.terminalApp!, ["-e", `sh ${execFilePath}`], {
      detached: true
    });
  } catch (error) {
    execa.sync("sh", [execFilePath]);
  }
};

export const mac = (execFilePath: string, options: Options): void => {
  try {
    execa.sync("open", ["-a", options.terminalApp!, execFilePath]);
  } catch (error) {
    execa.sync("open", [execFilePath]);
  }
};

export const iterm = (execFilePath: string, options: Options): void => {
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

export const tmux = (execFilePath: string, options: Options): void => {
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
