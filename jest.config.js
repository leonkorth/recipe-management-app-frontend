module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  automock: false,
  resetMocks: false,
  setupFiles: [
    './setupJest.js'
  ]
}
