import * as newshell from "../";
import tempy from "tempy";
import path from "path";
import fs from "fs";
import waitFor from "p-wait-for";
import pathExists from "path-exists";

test("shell is running", async () => {
  const testDir = tempy.directory();
  const testFile = path.join(testDir, "test-file");
  const testData = "foobar";

  const writeFileFuncPath = require.resolve("./utils/writeFile");

  newshell.shell(
    `__PATH__=${testFile} __DATA__=${testData} node ${writeFileFuncPath}`
  );

  await waitFor(() => pathExists(testFile), { timeout: 4000 });

  const foundTestData = fs.readFileSync(testFile, "utf-8");
  expect(foundTestData).toBe(testData);
});

test("shell is running a command in cwd", async () => {
  const testDir = tempy.directory();
  const testFile = path.join(testDir, "test-file");

  const writeCwdFuncPath = require.resolve("./utils/writeCwd");

  newshell.shell(`__PATH__=${testFile} node ${writeCwdFuncPath}`);

  await waitFor(() => pathExists(testFile), { timeout: 4000 });

  const foundScriptCwd = fs.readFileSync(testFile, "utf-8");

  expect(foundScriptCwd).toBe(process.cwd());
});
