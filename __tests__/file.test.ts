import * as newsh from "../";
import tempy from "tempy";
import path from "path";
import fs from "fs";
import waitFor from "p-wait-for";
import pathExists from "path-exists";

test("file is running", async () => {
  const testDir = tempy.directory();
  const testFile = path.join(testDir, "test-file");
  const testData = "foobar";

  newsh.file(path.join(__dirname, "./fixtures/writeFile"), {
    env: {
      __PATH__: testFile,
      __DATA__: testData
    }
  });

  await waitFor(() => pathExists(testFile), { timeout: 4000 });

  const foundTestData = fs.readFileSync(testFile, "utf-8");
  expect(foundTestData).toBe(testData);
});

// test("command is running in the same cwd", async () => {
//   const testDir = tempy.directory();
//   const testFile = path.join(testDir, "test-file");

//   const writeCwdFuncPath = require.resolve("./utils/writeCwd");

//   newsh.file(`node ${writeCwdFuncPath}`, {
//     env: {
//       __PATH__: testFile
//     }
//   });
//   await waitFor(() => pathExists(testFile), { timeout: 4000 });

//   const foundScriptCwd = fs.readFileSync(testFile, "utf-8");

//   expect(foundScriptCwd).toBe(process.cwd());
// });
