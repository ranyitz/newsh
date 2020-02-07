"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execa_1 = __importDefault(require("execa"));
const utils_1 = require("./utils");
// Runs an sh file in a new terminal window
function launchTerminal(execFilePath) {
    const terminalApp = utils_1.detectTerminalApp();
    const isWindows = /^win/.test(process.platform);
    const isMac = /darwin/.test(process.platform);
    const isLinux = /linux/.test(process.platform);
    if (isWindows) {
        throw new Error('windows is not yet supported');
    }
    if (isMac) {
        if (terminalApp) {
            // only supports mac
            return execa_1.default.sync('open', ['-a', terminalApp, execFilePath]);
        }
        else {
            return execa_1.default.sync('open', [execFilePath]);
        }
    }
    if (isLinux) {
        if (terminalApp) {
            return execa_1.default.sync(terminalApp, ['-e', `sh ${execFilePath}`], {
                detached: true,
            });
        }
        else {
            return execa_1.default.sync('sh', [execFilePath]);
        }
    }
}
exports.default = launchTerminal;
//# sourceMappingURL=launchTerminal.js.map