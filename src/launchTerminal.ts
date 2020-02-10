import { linux, mac, windows, iterm, tmux, Launcher } from "./launchers";
import { Options } from "./normalize";
import { ErrorMessage } from "./utils";

function chooseLauncher(options: Options): Launcher {
  const { split, terminalApp } = options;
  const platform = process.platform;
  const isWindows = /^win/.test(platform);
  const isMac = /darwin/.test(platform);
  const isLinux = /linux/.test(platform);
  const isIterm = ["iTerm", "iTerm.app", "iTerm2", "iTerm2.app"].includes(
    terminalApp!
  );

  const isTmux = !!process.env.TMUX_PANE;

  if (split) {
    if (isTmux) {
      return tmux;
    }

    if (isIterm) {
      return iterm;
    }
  }

  if (isMac) {
    return mac;
  }

  if (isWindows) {
    return windows;
  }

  if (isLinux) {
    return linux;
  }

  throw new ErrorMessage(`Could not recognize the OS ${platform}`);
}

export default function launchTerminal(
  execFilePath: string,
  options: Options
): void {
  const launcher = chooseLauncher(options);

  launcher(execFilePath, options);
}
