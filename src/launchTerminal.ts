import execa from 'execa';
import {detectTerminalApp} from './utils';

// Runs an sh file in a new terminal window
export default function launchTerminal(execFilePath: string) {
  const terminalApp = detectTerminalApp();

  const isWindows = /^win/.test(process.platform);
  const isMac = /darwin/.test(process.platform);
  const isLinux = /linux/.test(process.platform);

  if (isWindows) {
    throw new Error('windows is not yet supported');
  }

  if (isMac) {
    if (terminalApp) {
      // only supports mac
      return execa.sync('open', ['-a', terminalApp, execFilePath]);
    } else {
      return execa.sync('open', [execFilePath]);
    }
  }

  if (isLinux) {
    if (terminalApp) {
      return execa.sync(terminalApp, ['-e', `sh ${execFilePath}`], {
        detached: true,
      });
    } else {
      return execa.sync('sh', [execFilePath]);
    }
  }
}