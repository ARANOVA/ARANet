// scripts/report.ts

import * as reporter from 'cucumber-html-reporter';
import * as path from 'path';


// Opciones de configuración para el informe HTML
const options: reporter.Options = {
  theme: 'bootstrap',
  jsonFile: path.join(__dirname, '../reports/cucumber-report.json'),
  output: path.join(__dirname, '../reports/cucumber-report.html'),
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    "Project": "ARANet 2025",
    "Environment": "QA",
    "Browser": "Chrome",
    "Platform": "Mac OS"
  }
};

// Genera el informe HTML.
// Asegúrate de que el archivo JSON exista en la ruta especificada.
reporter.generate(options);

console.log('Informe HTML de Cucumber generado exitosamente.');