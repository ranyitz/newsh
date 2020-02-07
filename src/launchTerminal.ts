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

  else if (isMac) {
    try {
      return execa.sync('open', ['-a', terminalApp!, execFilePath]);
    } catch (error) {
      console.log(error)
      console.log(execFilePath);
      return execa.sync('open', [execFilePath]);
    }
  }


 else if(isLinux) {
    try {
      return execa.sync(terminalApp!, ['-e', `sh ${execFilePath}`], {
        detached: true,
      });
    } catch(error) {
      return execa.sync('sh', [execFilePath]);
    }
  }
}