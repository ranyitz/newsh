"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shell_1 = __importDefault(require("./shell"));
function LaunchNodeTerminal(nodeFilePath) {
    return shell_1.default(`/usr/bin/env node ${nodeFilePath}`);
}
exports.default = LaunchNodeTerminal;
//# sourceMappingURL=node.js.map