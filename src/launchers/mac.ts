import execa from "execa";
import { Launcher } from "./";
import { tmux } from "./tmux";
import { iterm } from "./iterm";

export const mac: Launcher = (execFilePath, options) => {
  const { terminalApp, split } = options;
  const isIterm = ["iTerm", "iTerm.app", "iTerm2", "iTerm2.app"].includes(
    terminalApp!
  );
  const isTmux = !!process.env.TMUX_PANE;

  try {
    if (isTmux && split) {
      return tmux(execFilePath, options);
    }

    if (isIterm && split) {
      return iterm(execFilePath, options);
    }

    execa.sync("open", ["-a", options.terminalApp!, execFilePath]);
  } catch (error) {
    execa.sync("open", [execFilePath]);
  }
};
