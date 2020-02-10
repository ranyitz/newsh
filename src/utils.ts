import chalk from "chalk";

export function detectTerminalApp(): string | undefined {
  return process.env.TERM_PROGRAM;
}

export class ErrorMessage extends Error {
  constructor(message: string) {
    super(chalk`{red ERROR:} ${message}`);
  }
}
