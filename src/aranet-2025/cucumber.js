module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      '__tests__/features/world/world.ts',
      '__tests__/features/world/hooks.ts',
      '__tests__/features/world/**/*.ts',
      '__tests__/features/step_definitions/*.ts'
    ],
    publishQuiet: true,
    stepTimeout: 10000,
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
