"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const shell_1 = __importDefault(require("./shell"));
const launchTerminal_1 = __importDefault(require("./launchTerminal"));
function file(filePath) {
    const extention = path_1.default.extname(filePath);
    switch (extention) {
        case '.js':
            shell_1.default(`/usr/bin/env node ${filePath}`);
            break;
        case '.sh':
        case '':
            launchTerminal_1.default(filePath);
            break;
        default:
            throw new Error(`extension ${extention} of file ${filePath} is not supported`);
    }
}
exports.default = file;
//# sourceMappingURL=file.js.map