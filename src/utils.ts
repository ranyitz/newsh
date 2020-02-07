export function detectTerminalApp(): string | undefined {
  return process.env.TERM_PROGRAM;
}
