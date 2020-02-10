import { linux, mac, windows, iterm, tmux } from "./launchers";
import { Options } from "./normalize";

export default function launchTerminal(
  execFilePath: string,
  options: Options
): void {
  const { split, terminalApp } = options;

  const platform = process.platform;
  const isWindows = /^win/.test(platform);
  const isMac = /darwin/.test(platform);
  const isLinux = /linux/.test(platform);
  const isIterm = terminalApp === "iTerm.app";
  const isTmux = !!process.env.TMUX_PANE;

  let launcher;

  if (split) {
    if (isTmux) {
      launcher = tmux;
    } else if (isIterm) {
      launcher = iterm;
    }
  } else if (isMac) {
    launcher = mac;
  } else if (isWindows) {
    launcher = windows;
  } else if (isLinux) {
    launcher = linux;
  }

  if (!launcher) {
    throw new Error(`Could not recognize the OS ${platform}`);
  }

  launcher(execFilePath, options);
}
