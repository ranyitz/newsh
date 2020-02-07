"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const tempy_1 = __importDefault(require("tempy"));
const fs_1 = __importDefault(require("fs"));
const launchTerminal_1 = __importDefault(require("./launchTerminal"));
function shell(script) {
    const launchNodeFilePath = path_1.default.join(tempy_1.default.directory(), 'launchTerminal.sh');
    fs_1.default.writeFileSync(launchNodeFilePath, script);
    // add execute permissions (-rwxr-xr-x)
    fs_1.default.chmodSync(launchNodeFilePath, 0o751);
    launchTerminal_1.default(launchNodeFilePath);
}
exports.default = shell;
//# sourceMappingURL=shell.js.map