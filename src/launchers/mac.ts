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

  if (options.terminalAppSetup !== undefined) {
    console.error(`terminalAppSetup not supported on mac yet`);
  }

  try {
    if (isTmux && split) {
      return tmux(execFilePath, options);
    }

    if (isIterm && split) {
      return iterm(execFilePath, options);
    }

    // When running from VSCode/Apple_Terminal It's better to verify that
    // we run the command using the Terminal.app
    if (
      !options.terminalApp ||
      ["vscode", "Apple_Terminal"].includes(options.terminalApp)
    ) {
      options.terminalApp = "Terminal";
    }

    execa.sync("open", ["-a", options.terminalApp!, execFilePath]);
  } catch (error) {
    execa.sync("open", [execFilePath]);
  }
};
