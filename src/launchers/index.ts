import { Options } from "../normalize";

export type Launcher = (execFilePath: string, options: Options) => void;

export * from "./linux";
export * from "./mac";
export * from "./windows";
