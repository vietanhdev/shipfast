import { useGenerateAbsoluteLocalePath } from '@shipfast/webapp-core//hooks';
import { FormattedDate } from '@shipfast/webapp-core/components/dateTime';
import { RoutesConfig } from '@shipfast/webapp-core/config/routes';
import { FormattedMessage } from 'react-intl';

import { Button, Layout } from '../../base';
import { EmailComponentProps } from '../../types';

export type TrialExpiresSoonProps = EmailComponentProps & {
  expiryDate: string;
};

export const Template = ({ expiryDate }: TrialExpiresSoonProps) => {
  const generateLocalePath = useGenerateAbsoluteLocalePath();
  const url = generateLocalePath(RoutesConfig.home);

  return (
    <Layout
      title={
        <FormattedMessage defaultMessage="Your trial is about to expire" id="Email / Trial Expires Soon / Title" />
      }
      text={
        <FormattedMessage
          defaultMessage="Your trial is about to expire on {expiryDate}, please take action"
          id="Email / Trial Expires Soon / Text"
          values={{ expiryDate: <FormattedDate value={expiryDate} /> }}
        />
      }
    >
      <Button linkTo={url}>
        <FormattedMessage defaultMessage="Go to the dashboard" id="Email / Trial Expires Soon / Link label" />
      </Button>
    </Layout>
  );
};

export const Subject = () => (
  <FormattedMessage defaultMessage="Your trial is about to expire" id="Email / Trial Expires Soon / Subject" />
);
