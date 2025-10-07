/* eslint-disable import/no-anonymous-default-export */
import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: {
    '^@aranova/aranova-react-ui$': '<rootDir>/packages/aranova-react-ui/src/lib/interfaces',
    '^@/(.*)$': '<rootDir>/src/$1',
  },  
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  roots: ["<rootDir>"],
};
