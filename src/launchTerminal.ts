import { linux, mac, windows, Launcher } from "./launchers";
import { Options } from "./normalize";
import { ErrorMessage } from "./utils";

function chooseLauncher(): Launcher {
  const platform = process.platform;
  const isWindows = /^win/.test(platform);
  const isMac = /darwin/.test(platform);
  const isLinux = /linux/.test(platform);

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
  const launcher = chooseLauncher();

  launcher(execFilePath, options);
}
