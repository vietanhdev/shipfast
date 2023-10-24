import { asyncComponent } from '@shipfast/webapp-core/utils/asyncComponent';

export const Documents = asyncComponent(() => import('./documents'));
