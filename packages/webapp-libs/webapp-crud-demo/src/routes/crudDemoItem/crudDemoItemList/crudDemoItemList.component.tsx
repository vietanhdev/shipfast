import { gql } from '@shipfast/webapp-api-client/graphql';
import { usePaginatedQuery } from '@shipfast/webapp-api-client/hooks';
import { ButtonVariant, Link } from '@shipfast/webapp-core/components/buttons';
import { Card, CardContent } from '@shipfast/webapp-core/components/cards';
import { PageHeadline } from '@shipfast/webapp-core/components/pageHeadline';
import { Pagination } from '@shipfast/webapp-core/components/pagination';
import { useGenerateLocalePath } from '@shipfast/webapp-core/hooks';
import { mapConnection } from '@shipfast/webapp-core/utils/graphql';
import { PlusCircle } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

import { RoutesConfig } from '../../../config/routes';
import { CrudDemoItemListItem } from './crudDemoItemListItem';
import { ListSkeleton } from './listSkeleton';

export const crudDemoItemListQuery = gql(/* GraphQL */ `
  query crudDemoItemListQuery($first: Int, $after: String, $last: Int, $before: String) {
    allCrudDemoItems(first: $first, after: $after, last: $last, before: $before) {
      edges {
        node {
          id
          ...crudDemoItemListItem
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
`);
export const ITEMS_PER_PAGE = 8;

export const CrudDemoItemList = () => {
  const generateLocalePath = useGenerateLocalePath();

  const { data, loading, hasNext, hasPrevious, loadNext, loadPrevious } = usePaginatedQuery(crudDemoItemListQuery, {
    hookOptions: {
      variables: {
        first: ITEMS_PER_PAGE,
      },
    },
    dataKey: 'allCrudDemoItems',
  });

  const renderList = () => {
    if (data) {
      if (data.allCrudDemoItems && data.allCrudDemoItems.edges.length <= 0) return renderEmptyList();

      return (
        <Card className="mt-4">
          <CardContent>
            <ul className="w-full mt-4 rounded [&>li]:border-b [&>li:last-child]:border-none">
              {mapConnection(
                (node) => (
                  <CrudDemoItemListItem item={node} key={node.id} />
                ),
                data.allCrudDemoItems
              )}
            </ul>
          </CardContent>
        </Card>
      );
    }
    return null;
  };

  const renderEmptyList = () => {
    return (
      <Card className="mt-4">
        <CardContent>
          <ul className="flex items-center justify-center w-full mt-4 rounded [&>li]:border-b [&>li]:border-slate-200 [&>li:last-child]:border-none">
            <li className="py-16">
              <h3 className="text-muted-foreground">
                <FormattedMessage id="CrudDemoItemList / Headline" defaultMessage="Empty list" />
              </h3>
            </li>
          </ul>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex-1 space-y-4 mt-4">
      <PageHeadline
        className="px-8"
        header={<FormattedMessage id="CrudDemoItemList / Title" defaultMessage="CRUD Example Items" />}
        subheader={
          <FormattedMessage
            id="CrudDemoItemList / Subheader"
            defaultMessage="Interactive CRUD example to explore and understand features"
          />
        }
      />

      <div className="px-8">
        <Link
          to={generateLocalePath(RoutesConfig.crudDemoItem.add)}
          variant={ButtonVariant.PRIMARY}
          icon={<PlusCircle className="mr-2 h-4 w-4" />}
        >
          <FormattedMessage id="CrudDemoItemList / Add new" defaultMessage="Add new item" />
        </Link>

        {loading ? (
          <ListSkeleton />
        ) : (
          <>
            {renderList()}
            <Pagination hasNext={hasNext} hasPrevious={hasPrevious} loadNext={loadNext} loadPrevious={loadPrevious} />
          </>
        )}
      </div>
    </div>
  );
};
