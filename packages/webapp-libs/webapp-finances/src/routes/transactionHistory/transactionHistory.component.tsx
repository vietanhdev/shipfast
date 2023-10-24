import { PageHeadline } from '@shipfast/webapp-core/components/pageHeadline';
import { PageLayout } from '@shipfast/webapp-core/components/pageLayout';
import { FormattedMessage } from 'react-intl';

import { TransactionHistory as TransactionHistoryList } from '../../components/stripe/transactionHistory';

export const TransactionHistory = () => {
  return (
    <PageLayout>
      <PageHeadline
        hasBackButton
        header={<FormattedMessage defaultMessage="Transaction history" id="Stripe / Transaction History / Header" />}
        subheader={
          <FormattedMessage defaultMessage="View transaction history" id="Stripe / Transaction History / Subheader" />
        }
      />

      <TransactionHistoryList />
    </PageLayout>
  );
};
