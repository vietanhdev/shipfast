import { asyncComponent } from '@shipfast/webapp-core/utils/asyncComponent';

export const SaasIdeas = asyncComponent(() => import('./saasIdeas'));
export const TextGen = asyncComponent(() => import('./textGen'));
export const DocChat = asyncComponent(() => import('./docChat'));

