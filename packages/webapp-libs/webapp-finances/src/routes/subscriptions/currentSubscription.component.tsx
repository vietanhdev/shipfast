import { PageHeadline } from '@shipfast/webapp-core/components/pageHeadline';
import { Tabs, TabsList, TabsTrigger } from '@shipfast/webapp-core/components/tabs';
import { useGenerateLocalePath } from '@shipfast/webapp-core/hooks';
import { FormattedMessage } from 'react-intl';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { RoutesConfig } from '../../config/routes';
import { useActiveSubscriptionQueryLoader } from '../../hooks';

export const Subscriptions = () => {
  const location = useLocation();
  const generateLocalePath = useGenerateLocalePath();
  const activeSubscriptionData = useActiveSubscriptionQueryLoader();

  return (
    <div className="flex-1 space-y-4 mt-4">
      <PageHeadline
        className="px-8"
        header={<FormattedMessage defaultMessage="My subscription" id="My subscription / Header" />}
        subheader={
          <FormattedMessage
            defaultMessage="Manage your subscriptions for our services."
            id="My subscription / Subheading"
          />
        }
      />
      <div className="px-8">
        <Tabs value={location.pathname}>
          <TabsList className="flex flex-col sm:flex-row h-full sm:h-10 sm:w-fit w-full">
            <Link to={generateLocalePath(RoutesConfig.subscriptions.index)} replace>
              <TabsTrigger value={generateLocalePath(RoutesConfig.subscriptions.index)}>
                <FormattedMessage defaultMessage="Current subscription" id="My subscription / Current subscription" />
              </TabsTrigger>
            </Link>
            <Link to={generateLocalePath(RoutesConfig.subscriptions.paymentMethods.index)} replace>
              <TabsTrigger value={generateLocalePath(RoutesConfig.subscriptions.paymentMethods.index)}>
                <FormattedMessage defaultMessage="Payment methods" id="My subscription / Payment methods" />
              </TabsTrigger>
            </Link>
            <Link to={generateLocalePath(RoutesConfig.subscriptions.transactionHistory.index)} replace>
              <TabsTrigger value={generateLocalePath(RoutesConfig.subscriptions.transactionHistory.index)}>
                <FormattedMessage defaultMessage="Transaction history" id="My subscription / Transaction history" />
              </TabsTrigger>
            </Link>
          </TabsList>

          <Outlet context={{ ...activeSubscriptionData }} />
        </Tabs>
      </div>
    </div>
  );
};
