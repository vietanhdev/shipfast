import { App } from 'aws-cdk-lib';
import {
  loadEnvSettings,
  getEnvStackName,
} from '@shipfast/infra-core';

import { DocsStack } from './stacks/docs';

(async () => {
  const envSettings = await loadEnvSettings();
  const app = new App();

  new DocsStack(app, getEnvStackName('DocsStack', envSettings), {
    envSettings,
  });
})();
