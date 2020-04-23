import { InitialOptions } from "./cli";
import { detectTerminalApp } from "./utils";

export type Options = {
  env: NodeJS.ProcessEnv;
  cwd: string;
  cd: string;
  split: boolean;
  splitDirection: "vertically" | "horizontally";
  terminalApp: string | undefined;
  terminalAppSetup?: string | undefined;
};

const defaultOptions: Options = {
  env: process.env,
  cwd: process.cwd(),
  cd: process.cwd(),
  split: false,
  splitDirection: "vertically",
  terminalApp: detectTerminalApp()
};

// eslint-disable-next-line
function removeUndefinedValues(obj: Record<string, any>) {
  for (const key in obj) {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  }

  return obj;
}

export default (initialOptions: InitialOptions): Options => {
  const options = {
    ...defaultOptions,
    ...removeUndefinedValues(initialOptions),
    env: {
      ...defaultOptions.env,
      ...initialOptions.env
    }
  };

  return options as Options;
};
