import path from 'path';
import tempy from 'tempy';
import fs from 'fs';
import launchTerminal from './launchTerminal';

export default function shell(script: string) {
  const launchNodeFilePath = path.join(tempy.directory(), 'launchTerminal.sh');
  fs.writeFileSync(launchNodeFilePath, script);
  
  // add execute permissions (-rwxr-xr-x)
  fs.chmodSync(launchNodeFilePath, 0o751);

  launchTerminal(launchNodeFilePath);
}
