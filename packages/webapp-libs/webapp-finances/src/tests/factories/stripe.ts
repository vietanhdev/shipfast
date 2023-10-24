import { transactionHistoryEntryFactory } from '@shipfast/webapp-api-client/tests/factories';
import { composeMockedListQueryResult } from '@shipfast/webapp-api-client/tests/utils';
import { times } from 'ramda';

import { stripeAllChargesQuery } from '../../routes/subscriptions/subscriptions.graphql';

export const fillAllStripeChargesQuery = (data = times(() => transactionHistoryEntryFactory(), 5)) => {
  return composeMockedListQueryResult(stripeAllChargesQuery, 'allCharges', 'StripeChargeType', {
    data,
  });
};
