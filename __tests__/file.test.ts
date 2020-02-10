import * as newsh from "../";
import tempy from "tempy";
import path from "path";
import fs from "fs";
import waitFor from "p-wait-for";
import pathExists from "path-exists";

const writeFileFuncPath = require.resolve("./utils/writeFile");
const writeCwdFuncPath = require.resolve("./utils/writeCwd");

describe("file", () => {
  test("no extension", async () => {
    const testDir = tempy.directory();
    const testFile = path.join(testDir, "test-file");
    const testData = "foobar";

    newsh.file(path.join(__dirname, "./fixtures/writeFile"), {
      env: {
        __WRITE_FILE_JS__: writeFileFuncPath,
        __PATH__: testFile,
        __DATA__: testData
      }
    });

    await waitFor(() => pathExists(testFile), { timeout: 4000 });

    const foundTestData = fs.readFileSync(testFile, "utf-8");
    expect(foundTestData).toBe(testData);
  });

  test(".sh", async () => {
    const testDir = tempy.directory();
    const testFile = path.join(testDir, "test-file");
    const testData = "foobar";

    newsh.file(path.join(__dirname, "./fixtures/writeFile.sh"), {
      env: {
        __WRITE_FILE_JS__: writeFileFuncPath,
        __PATH__: testFile,
        __DATA__: testData
      }
    });

    await waitFor(() => pathExists(testFile), { timeout: 4000 });

    const foundTestData = fs.readFileSync(testFile, "utf-8");
    expect(foundTestData).toBe(testData);
  });

  test(".js", async () => {
    const testDir = tempy.directory();
    const testFile = path.join(testDir, "test-file");
    const testData = "foobar";

    newsh.file(writeFileFuncPath, {
      env: {
        __PATH__: testFile,
        __DATA__: testData
      }
    });

    await waitFor(() => pathExists(testFile), { timeout: 4000 });

    const foundTestData = fs.readFileSync(testFile, "utf-8");
    expect(foundTestData).toBe(testData);
  });

  test("running in the same cwd", async () => {
    const testDir = tempy.directory();
    const testFile = path.join(testDir, "test-file");

    newsh.file(writeCwdFuncPath, {
      env: {
        __PATH__: testFile
      }
    });

    await waitFor(() => pathExists(testFile), { timeout: 4000 });

    const foundScriptCwd = fs.readFileSync(testFile, "utf-8");

    expect(foundScriptCwd).toBe(process.cwd());
  });
});
