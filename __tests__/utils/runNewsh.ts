import execa, { CommonOptions } from "execa";

const newshBin = require.resolve("../../bin/newsh.js");

export default async (
  args: string | string[],
  options: CommonOptions<"utf8"> = {}
): Promise<{ stdout: string; stderr: string }> => {
  return await execa(newshBin, [].concat(args), options);
};
