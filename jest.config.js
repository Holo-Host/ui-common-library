module.exports = {
  globals: {},
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\js$": "babel-jest"
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx'],
  moduleNameMapper: {
    "src/(.*)$": "<rootDir>/src/$1",
    "pages/(.*)$": "<rootDir>/src/pages/$1",
    "components/(.*)$": "<rootDir>/src/components/$1",
    "^utils/(.*)$": "<rootDir>/src/utils/$1",
    "^types/(.*)$": "<rootDir>/src/types/$1"
  },
  setupFiles: ["jest-canvas-mock"],
}
