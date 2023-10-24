import { PageHeadline } from '@shipfast/webapp-core/components/pageHeadline';
import { RoutesConfig as CoreRoutesConfig } from '@shipfast/webapp-core/config/routes';
import { useGenerateLocalePath } from '@shipfast/webapp-core/hooks';
import { useToast } from '@shipfast/webapp-core/toast/useToast';
import { Elements } from '@stripe/react-stripe-js';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { StripePaymentForm } from '../../components/stripe';
import { stripePromise } from '../../services/stripe';

export const PaymentConfirm = () => {
  const intl = useIntl();
  const { toast } = useToast();
  const navigate = useNavigate();
  const generateLocalePath = useGenerateLocalePath();

  const successMessage = intl.formatMessage({
    defaultMessage: 'Payment successful',
    id: 'Stripe payment confirm / payment successful',
  });

  return (
    <div className="flex-1 space-y-4 mt-4">
      <PageHeadline
        className="px-8"
        header={<FormattedMessage defaultMessage="Payments" id="Finances / Stripe / Payment confirm / heading" />}
        subheader={
          <FormattedMessage
            defaultMessage="Purchase new tokens for your account."
            id="Finances / Stripe / Payment confirm / subheading"
          />
        }
      />
      <div className="px-8">
        <Elements stripe={stripePromise} options={{ locale: 'en' }}>
          <StripePaymentForm
            onSuccess={() => {
              navigate(generateLocalePath(CoreRoutesConfig.home));
              toast({ description: successMessage });
            }}
          />
        </Elements>
      </div>
    </div>
  );
};
