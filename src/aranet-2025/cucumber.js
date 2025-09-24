module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      '__tests__/features/step_definitions/**/*.ts',
      '__tests__/features/support/**/*.ts'
    ],
    paths: ['__tests__/features/**/*.feature']
  }
};
