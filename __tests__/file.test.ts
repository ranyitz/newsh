import * as newsh from "../";
import tempy from "tempy";
import path from "path";
import fs from "fs";
import waitFor from "p-wait-for";
import pathExists from "path-exists";
import { waitForFile, readFile } from "./utils/runNewsh";

const writeFileFuncPath = require.resolve("./utils/writeFile");
const writeCwdFuncPath = require.resolve("./utils/writeCwd");

describe("file", () => {
  test("no extension", async () => {
    const testFile = tempy.file();
    const testData = "foobar";

    newsh.file(path.join(__dirname, "./fixtures/writeFile"), {
      env: {
        __WRITE_FILE_JS__: writeFileFuncPath,
        __PATH__: testFile,
        __DATA__: testData
      }
    });

    await waitForFile(testFile);
    expect(readFile(testFile)).toBe(testData);
  });

  test(".sh", async () => {
    const testFile = tempy.file();
    const testData = "foobar";

    newsh.file(path.join(__dirname, "./fixtures/writeFile.sh"), {
      env: {
        __WRITE_FILE_JS__: writeFileFuncPath,
        __PATH__: testFile,
        __DATA__: testData
      }
    });

    await waitForFile(testFile);
    expect(readFile(testFile)).toBe(testData);
  });

  test(".js", async () => {
    const testFile = tempy.file();
    const testData = "foobar";

    newsh.file(writeFileFuncPath, {
      env: {
        __PATH__: testFile,
        __DATA__: testData
      }
    });

    await waitForFile(testFile);
    expect(readFile(testFile)).toBe(testData);
  });

  test("running in the same cwd", async () => {
    const testFile = tempy.file();

    newsh.file(writeCwdFuncPath, {
      env: {
        __PATH__: testFile
      }
    });

    await waitForFile(testFile);
    expect(readFile(testFile)).toBe(process.cwd());
  });
});
