module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      '__tests__/features/**/*.ts'
    ],
    paths: ['__tests__/features/**/*.feature'],
    format: [
      'json:reports/cucumber-report.json',
      'junit:reports/junit-report.xml'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    }
  }
};
