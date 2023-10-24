import { CrudItemCreated, CrudItemUpdated } from '@shipfast/webapp-crud-demo/notifications';
import { NotificationTypes } from '@shipfast/webapp-notifications';
import { ElementType } from 'react';

const templates: Record<NotificationTypes, ElementType> = {
  [NotificationTypes.CRUD_ITEM_CREATED]: CrudItemCreated,
  [NotificationTypes.CRUD_ITEM_UPDATED]: CrudItemUpdated,
};
export default templates;
