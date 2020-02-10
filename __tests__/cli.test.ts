import tempy from "tempy";
import path from "path";
import fs from "fs";
import waitFor from "p-wait-for";
import pathExists from "path-exists";
import runNewsh from "./utils/runNewsh";

const writeFileFuncPath = require.resolve("./utils/writeFile");

test("cli", async () => {
  const testDir = tempy.directory();
  const testFile = path.join(testDir, "test-file");
  const testData = "foobar";

  await runNewsh([`node ${writeFileFuncPath}`], {
    env: {
      __PATH__: testFile,
      __DATA__: testData
    }
  });

  await waitFor(() => pathExists(testFile), { timeout: 4000 });

  const foundTestData = fs.readFileSync(testFile, "utf-8");
  expect(foundTestData).toBe(testData);
});
