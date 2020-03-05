import execa from "execa";
import { Launcher } from "./";

export const linux: Launcher = (execFilePath, options) => {
  try {
    execa.sync(options.terminalApp!, ["-e", `sh ${execFilePath}`], {
      detached: true
    });
  } catch (error) {
    execa.sync("sh", [execFilePath]);
  }
};
