import tempy from "tempy";
import runNewsh, { waitForFile, readFile } from "./utils/runNewsh";

const writeFileFuncPath = require.resolve("./utils/writeFile");

describe("cli", () => {
  test("command", async () => {
    const testFile = tempy.file();
    const testData = "foobar";

    const child = await runNewsh([`node ${writeFileFuncPath}`], {
      env: {
        __PATH__: testFile,
        __DATA__: testData
      }
    });

    await waitForFile(testFile, child);

    expect(readFile(testFile)).toBe(testData);
  });

  test("file", async () => {
    const testFile = tempy.file();
    const testData = "foobar";

    const child = await runNewsh(["--file", writeFileFuncPath], {
      env: {
        __PATH__: testFile,
        __DATA__: testData
      }
    });

    await waitForFile(testFile, child);

    expect(readFile(testFile)).toBe(testData);
  });

  test("split", async () => {
    const testFile = tempy.file();
    const testData = "foobar";

    const child = await runNewsh(["--split", `node ${writeFileFuncPath}`], {
      env: {
        __PATH__: testFile,
        __DATA__: testData
      }
    });

    await waitForFile(testFile, child);

    expect(readFile(testFile)).toBe(testData);
  });

  test("split horizontally", async () => {
    const testFile = tempy.file();
    const testData = "foobar";

    const child = await runNewsh(
      ["--split-horizontally", `node ${writeFileFuncPath}`],
      {
        env: {
          __PATH__: testFile,
          __DATA__: testData
        }
      }
    );

    await waitForFile(testFile, child);
    expect(readFile(testFile)).toBe(testData);
  });
});
