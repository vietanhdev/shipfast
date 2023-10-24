import { RoutesConfig as ContentfulRoutesConfig } from '@shipfast/webapp-contentful/config/routes';
import { RoutesConfig as CoreRoutesConfig } from '@shipfast/webapp-core/config/routes';
import { getLocalePath } from '@shipfast/webapp-core/utils/path';
import { RoutesConfig as CrudDemoRoutesConfig } from '@shipfast/webapp-crud-demo/config/routes';
import { RoutesConfig as FinancesRoutesConfig } from '@shipfast/webapp-finances/config/routes';
import { RoutesConfig as GenerativeAIRoutesConfig } from '@shipfast/webapp-generative-ai/config/routes';

export const LANG_PREFIX = `/:lang?/*`;

export const RoutesConfig = {
  ...CoreRoutesConfig,
  documents: 'documents',
  ...GenerativeAIRoutesConfig,
  ...ContentfulRoutesConfig,
  ...CrudDemoRoutesConfig,
  ...FinancesRoutesConfig,
  //<-- INJECT ROUTE DEFINITION -->
};

export const NO_NAVIGATION_ROUTES = [
  RoutesConfig.login,
  RoutesConfig.logout,
  RoutesConfig.signup,
  RoutesConfig.validateOtp,
  RoutesConfig.confirmEmail,
  RoutesConfig.passwordReset.index,
  RoutesConfig.passwordReset.confirm,
].map(getLocalePath);
