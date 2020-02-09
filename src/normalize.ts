import { InitialOptions, error } from "./cli";
import merge from "lodash.merge";
import { detectTerminalApp } from "./utils";

export type Options = {
  env?: Record<string, string>;
  split?: boolean;
  splitDirection: "vertically" | "horizontally" | undefined;
  terminalApp?: string | undefined;
};

const defaultOptions: InitialOptions = {
  env: {},
  split: false,
  splitDirection: "vertically",
  terminalApp: detectTerminalApp()
};

export default (initialOptions: InitialOptions): Options => {
  const { splitDirection } = initialOptions;

  if (
    splitDirection &&
    splitDirection !== "vertically" &&
    splitDirection !== "horizontally"
  ) {
    throw new Error(
      error(
        `splitDirection "${splitDirection}" should be either "vertically" or "horizontally"`
      )
    );
  }

  const optionsWithDefaults = merge(defaultOptions, initialOptions);

  return optionsWithDefaults as Options;
};
