export default {
  clearMocks: true,
  collectCoverage: true,
  coverageProvider: "v8",
  coverageReporters: ["text"],
  testEnvironment: "node",
  moduleNameMapper: {
    "@assets/(.*)": "<rootDir>/src/assets/$1",
    "@type/(.*)": "<rootDir>/src/types/$1",
    "@utils/(.*)": "<rootDir>/src/utils/$1",
  },
}
