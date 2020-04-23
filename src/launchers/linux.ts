import execa from "execa";
import { Launcher } from "./";
import commandExists = require("command-exists");
const commandExistsSync = commandExists.sync;

export const linux: Launcher = (execFilePath, options) => {
  const terminal = options.terminalApp
    ? options.terminalApp
    : ["gnome-terminal", "konsole", "xterm", "io.elementary.terminal"].find(
        commandExistsSync
      );
  try {
    execa.sync(terminal!, ["-e", `sh ${execFilePath}`], {
      detached: true
    });
  } catch (error) {
    execa.sync("sh", [execFilePath]);
  }
};
