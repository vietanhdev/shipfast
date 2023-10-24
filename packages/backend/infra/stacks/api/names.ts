import { EnvironmentSettings } from '@shipfast/infra-core';

export function getApiServiceName(envSettings: EnvironmentSettings) {
  return `${envSettings.projectEnvName}-api`;
}
