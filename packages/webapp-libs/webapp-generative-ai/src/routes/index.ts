import { asyncComponent } from '@sb/webapp-core/utils/asyncComponent';

export const SaasIdeas = asyncComponent(() => import('./saasIdeas'));
export const TextGen = asyncComponent(() => import('./textGen/textGen.component'));
