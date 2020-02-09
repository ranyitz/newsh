import { linux, mac, windows, iterm } from "./launchers";
import { Options } from ".//command";

export default function launchTerminal(
  execFilePath: string,
  options: Options
): void {
  const platform = process.platform;
  const isWindows = /^win/.test(platform);
  const isMac = /darwin/.test(platform);
  const isLinux = /linux/.test(platform);

  const { split, terminalApp } = options;

  let launcher;

  if (isMac) {
    if (split && terminalApp === "iTerm.app") {
      launcher = iterm;
    } else {
      launcher = mac;
    }
  }

  if (isWindows) {
    launcher = windows;
  }

  if (isLinux) {
    launcher = linux;
  }

  if (!launcher) {
    throw new Error(`Could not recognize the OS ${platform}`);
  }

  launcher(execFilePath, options);
}
