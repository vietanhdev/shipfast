import { useGenerateLocalePath } from '@shipfast/webapp-core/hooks';
import { Notification, NotificationType } from '@shipfast/webapp-notifications';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { RoutesConfig } from '../../config/routes';

export type CrudItemUpdatedProps = NotificationType<{
  id: string;
  name: string;
}>;

export const CrudItemUpdated = ({ data: { id, name }, issuer, ...restProps }: CrudItemUpdatedProps) => {
  const generateLocalePath = useGenerateLocalePath();
  const navigate = useNavigate();

  return (
    <Notification
      {...restProps}
      onClick={() => {
        const route = generateLocalePath(RoutesConfig.crudDemoItem.details, { id });
        navigate(route);
      }}
      avatar={issuer?.avatar}
      title={issuer?.email}
      content={
        <FormattedMessage
          defaultMessage={'CRUD item "{name}" has been updated'}
          id="Notifications / CrudItemUpdated / Content"
          values={{ name }}
        />
      }
    />
  );
};
