# Changelog

## 0.7.4 (Mar 5, 2020)

- [#17](https://github.com/ranyitz/newsh/pull/17) Configure default terminal for mac in case of `VSCode`/`Apple_Terminal`

## 0.7.1 (Mar 5, 2020)

Fixed a bug where `iTerm` and `Linux` launchers didn't work

## 0.7.0 (Mar 4, 2020)

- [#13](https://github.com/ranyitz/newsh/pull/13) Add `ConEmu` and `Cmder` split support
- [#13](https://github.com/ranyitz/newsh/pull/13) Add `--cd` as a CLI option

## 0.6.0 (Mar 4, 2020)

- [#12](https://github.com/ranyitz/newsh/pull/12) Add support for `cd` option in node API (decide in which directory to run the new shell)

## 0.5.0 (Feb 12, 2020)

- [#8](https://github.com/ranyitz/newsh/pull/8) Remove `lodash.merge` to lower download size
- Pass environment parameters from the initial process to the new shell
- [#10](https://github.com/ranyitz/newsh/pull/10) Add `${cwd}/node_modules/.bin` directory to `PATH`/`Path`

## 0.4.1 (Feb 11, 2020)

- Added support for multiple cases of iTerm app name
- Fix a bug when using split without `iterm`/`tmux`
- [#7](https://github.com/ranyitz/newsh/pull/7) Improve tests coverage and infra

## 0.4.0 (Feb 10, 2020)

- [#6](https://github.com/ranyitz/newsh/pull/6) Add tests for `file` and `CLI`
- Added support for absolute path in `file` method
- Pass environment parameters to the new shell instance
- Added [${version}] to the help page

## 0.3.0 (Feb 10, 2020)

- [#4](https://github.com/ranyitz/newsh/pull/4) Add support for split in tmux 🎛
- [#5](https://github.com/ranyitz/newsh/pull/5) Change `--splitDirection` cli argument into `--split-vertically` and `--split-horizontally`
- Send errors without stack in the CLI

## 0.2.0 (Feb 9, 2020)

Rename into `newsh` 🐚

## 0.1.0 (Feb 9, 2020)

- [#2](https://github.com/ranyitz/newsh/pull/2) Support spliting (instead of opening new window/tab) with `iTerm2`

## 0.0.4 (Feb 8, 2020)

Publish only relevant files

## 0.0.3 (Feb 8, 2020)

Rename `shell` to `command` in node API

## 0.0.2 (Feb 8, 2020)

- [#1](https://github.com/ranyitz/newsh/pull/1) Windows support

## 0.0.1 (Feb 8, 2020)

- Initial version
