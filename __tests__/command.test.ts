import * as newsh from "../";
import tempy from "tempy";
import { waitForFile, readFile } from "./utils/runNewsh";

const writeFileFuncPath = require.resolve("./utils/writeFile");
const writeCwdFuncPath = require.resolve("./utils/writeCwd");

test("command is running", async () => {
  const testFile = tempy.file();
  const testData = "foobar";

  newsh.command(`node ${writeFileFuncPath}`, {
    env: {
      __PATH__: testFile,
      __DATA__: testData
    }
  });

  await waitForFile(testFile);
  expect(readFile(testFile)).toBe(testData);
});

test("command is running in the same cwd", async () => {
  const testFile = tempy.file();

  newsh.command(`node ${writeCwdFuncPath}`, {
    env: {
      __PATH__: testFile
    }
  });

  await waitForFile(testFile);

  expect(readFile(testFile)).toBe(process.cwd());
});
