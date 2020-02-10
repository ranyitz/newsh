import execa, { CommonOptions } from "execa";
import fs from "fs";
import waitFor from "p-wait-for";
import pathExists from "path-exists";

const newshBin = require.resolve("../../bin/newsh.js");

export default async (
  args: string | string[],
  options: CommonOptions<"utf8"> = {}
): Promise<{ stdout: string; stderr: string }> => {
  return await execa(newshBin, [].concat(args), options);
};

export async function waitForFile(
  testFile: string,
  child?: {
    stdout: string;
    stderr: string;
  }
): Promise<void> {
  try {
    await waitFor(() => pathExists(testFile), { timeout: 4000 });
  } catch (error) {
    if (!child) {
      throw error;
    }

    throw new Error(`${error.message}

      STDOUT: ${child.stdout}
      STDERR: ${child.stderr}`);
  }
}

export function readFile(file: string): string {
  return fs.readFileSync(file, "utf-8");
}
