module.exports = {
  globals: {},
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\js$": "babel-jest"
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx'],
  moduleNameMapper: {
    "^@vue/(.*)$": "<rootDir>/testing/node_modules/@vue/$1",
    "^@testing-library/(.*)$": "<rootDir>/testing/node_modules/@testing-library/$1",
    "^vue": "<rootDir>/testing/node_modules/vue",
    "src/(.*)$": "<rootDir>/src/$1",
    "pages/(.*)$": "<rootDir>/src/pages/$1",
    "components/(.*)$": "<rootDir>/src/components/$1",
    "^utils/(.*)$": "<rootDir>/src/utils/$1",
    "^types/(.*)$": "<rootDir>/src/types/$1"
  },
  setupFiles: ["jest-canvas-mock"],
}
