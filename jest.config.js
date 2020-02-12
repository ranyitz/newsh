module.exports = {
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
  testRunner: "jest-circus/runner",
  setupFilesAfterEnv: ["./jest.setup.js"]
};
