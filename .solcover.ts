module.exports = {
  skipFiles: ["interfaces/", "mock/"],
  configureYulOptimizer: true,
  istanbulReporter: ['html', 'lcov', 'json'],
};
