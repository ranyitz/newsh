import { exec } from "child_process";
import { Launcher } from "./";

export const conEmu: Launcher = (execFilePath, options) => {
  let splitSuffix = "";

  if (options.split) {
    const conEmuSplitDirection =
      options.splitDirection === "vertically" ? "H" : "V";
    splitSuffix = `:s${conEmuSplitDirection}`;
  }

  exec(
    `cmd.exe -new_console${splitSuffix}:b:d:"${options.cd}" /k ${execFilePath}`
  );
};
