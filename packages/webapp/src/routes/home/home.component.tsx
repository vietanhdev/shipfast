import { Link } from '@shipfast/webapp-core/components/buttons';
import { PageLayout } from '@shipfast/webapp-core/components/pageLayout';
import { H4, Paragraph } from '@shipfast/webapp-core/components/typography';
import { useGenerateLocalePath } from '@shipfast/webapp-core/hooks';
import { ArrowUpRight } from 'lucide-react';
import { useIntl } from 'react-intl';

import { RoutesConfig } from '../../app/config/routes';

type DashboardItem = {
  title: string;
  subtitle: string;
  link: string;
};

export const Home = () => {
  const intl = useIntl();
  const generateLocalePath = useGenerateLocalePath();
  const dashboardItems: DashboardItem[] = [
    {
      title: intl.formatMessage({
        defaultMessage: 'Payments',
        id: 'Home / Payments / Title',
      }),
      subtitle: intl.formatMessage({
        defaultMessage: "Manage your business's payments.",
        id: 'Home / Payments / Subtitle',
      }),
      link: generateLocalePath(RoutesConfig.finances.paymentConfirm),
    },
    {
      title: intl.formatMessage({
        defaultMessage: 'Subscriptions',
        id: 'Home / Subscriptions / Title',
      }),
      subtitle: intl.formatMessage({
        defaultMessage: 'Manage your subscriptions.',
        id: 'Home / Subscriptions / Subtitle',
      }),
      link: generateLocalePath(RoutesConfig.subscriptions.currentSubscription.index),
    },
    {
      title: intl.formatMessage({
        defaultMessage: 'Documents',
        id: 'Home / Documents / Title',
      }),
      subtitle: intl.formatMessage({
        defaultMessage: 'Manage your documents.',
        id: 'Home / Documents / Subtitle',
      }),
      link: generateLocalePath(RoutesConfig.documents),
    },
    {
      title: intl.formatMessage({
        defaultMessage: 'CRUD',
        id: 'Home / CRUD / Title',
      }),
      subtitle: intl.formatMessage({
        defaultMessage: 'Manage your CRUD.',
        id: 'Home / CRUD / Subtitle',
      }),
      link: generateLocalePath(RoutesConfig.crudDemoItem.list),
    },
  ];

  const renderItem = (item: DashboardItem, key: number) => (
    <Link navLink to={item.link} className="group relative bg-background p-6" key={key}>
      <ArrowUpRight className="absolute right-4 top-4 h-8 w-8 text-muted group-hover:text-muted-foreground" />
      <H4 className="pr-8">{item.title}</H4>
      <Paragraph firstChildMargin={false} className="mt-1 text-sm text-muted-foreground">
        {item.subtitle}
      </Paragraph>
    </Link>
  );

  return (
    <PageLayout className="lg:max-w-full mr">
      <div id="controls-carousel" className="relative w-full" data-carousel="static">
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          <div className="duration-700 ease-in-out" data-carousel-item>
            <img src="/images/slides/banner.png" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
          </div>
        </div>
        <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>

      <div className="grid w-full grid-cols-1 gap-[1px] bg-muted md:grid-cols-2">
        {dashboardItems.map((item, key) => renderItem(item, key))}
      </div>
    </PageLayout>
  );
};
