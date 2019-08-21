module.exports = {
  preset: 'ts-jest',
  testRegex: 'test\\/(entry|plugins|consts)',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
}
