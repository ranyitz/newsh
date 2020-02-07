import path from 'path';
import shell from './shell';
import launchTerminal from './launchTerminal';

export default function file(filePath: string) {
  const extention = path.extname(filePath);

  switch(extention) {
    case '.js': shell(`/usr/bin/env node ${filePath}`)
      break
    case '.sh':
    case '': launchTerminal(filePath)
      break
    default:
      throw new Error(`extension ${extention} of file ${filePath} is not supported`);
  }
}
