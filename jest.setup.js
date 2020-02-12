if (process.env.GITHUB_ACTIONS) {
  jest.retryTimes(3);
}
