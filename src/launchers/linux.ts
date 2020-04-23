import execa from "execa";
import { Launcher } from "./";

export const linux: Launcher = (execFilePath, options) => {
  let argArray = ["-e", "{{file}}"];
  if (options.terminalAppSetup !== undefined) {
    argArray = options.terminalAppSetup.split(" ");
  }
  for (let i = 0; i < argArray.length; i++) {
    if (argArray[i] === "{{file}}") {
      argArray[i] = `sh ${execFilePath}`;
    }
  }
  try {
    execa.sync(options.terminalApp!, argArray, {
      detached: true
    });
  } catch (error) {
    execa.sync("sh", [execFilePath]);
  }
};
