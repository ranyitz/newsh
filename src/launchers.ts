import execa from "execa";
import path from "path";
import { Options } from "./normalize";
import { exec } from "child_process";

export type Launcher = (execFilePath: string, options: Options) => void;

export const windows: Launcher = (execFilePath, options) => {
  execa.sync(
    "cmd.exe",
    ["/C", path.join(__dirname, "../scripts/windows.bat")],
    {
      detached: true,
      stdio: "ignore",
      env: {
        FILE_PATH: execFilePath,
        CD: options.cd
      }
    }
  );
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

export const conEmu: Launcher = (execFilePath, options) => {
  let splitSuffix = "";

  if (options.split) {
    const conEmuSplitDirection =
      options.splitDirection === "vertically" ? "H" : "V";
    splitSuffix = `:s${conEmuSplitDirection}`;
  }

  try {
    exec(
      `cmd.exe -new_console${splitSuffix}:d:"${options.cd}" /k ${execFilePath}`
    );
  } catch (error) {
    windows(execFilePath, options);
  }
};
