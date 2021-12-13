import { cpus } from 'os'
import type { Config } from '@jest/types'

const cpuCount = cpus().length
const maxConcurrency = cpuCount > 4 ? cpuCount - 2 : cpuCount

const config: Config.ConfigGlobals = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../../',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  verbose: true,
  logHeapUsage: true,
  cache: false,
  bail: true,
  testEnvironment: 'node',
  maxConcurrency,
  maxWorkers: maxConcurrency,
}

export default config
