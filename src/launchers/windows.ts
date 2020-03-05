import execa from "execa";
import path from "path";
import { Launcher } from "./";
import { conEmu } from "./conEmu";

const startWindows: Launcher = (execFilePath, options) => {
  execa.sync(
    "cmd.exe",
    ["/C", path.join(__dirname, "../../scripts/windows.bat")],
    {
      detached: true,
      stdio: "ignore",
      env: {
        FILE_PATH: execFilePath,
        CD: options.cd
      }
    }
  );
};

export const windows: Launcher = (execFilePath, options) => {
  const isConEmu = !!process.env.ConEmuBuild;

  if (isConEmu) {
    try {
      return conEmu(execFilePath, options);
    } catch (error) {
      return startWindows(execFilePath, options);
    }
  }

  startWindows(execFilePath, options);
};
