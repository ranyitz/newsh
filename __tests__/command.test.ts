import * as newsh from "../";
import path from "path";
import tempy from "tempy";
import { waitForFile, readFile } from "./utils/runNewsh";

const writeFileFuncPath = require.resolve("./utils/writeFile");
const writeCwdFuncPath = require.resolve("./utils/writeCwd");
const writePATHFuncPath = require.resolve("./utils/writePATH");

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

test("command is pushing ${cwd}/node_module/.bin to PATH", async () => {
  const testFile = tempy.file();

  newsh.command(`node ${writePATHFuncPath}`, {
    env: {
      __PATH__: testFile
    }
  });

  await waitForFile(testFile);

  const content = readFile(testFile);
  const firstPATHChunk = content.slice(0, content.indexOf(":"));

  expect(firstPATHChunk).toMatch(`node_modules${path.sep}.bin`);
});
