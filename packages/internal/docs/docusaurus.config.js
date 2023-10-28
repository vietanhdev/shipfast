let algoliaSearch = {};
if (process.env.ALGOLIA_APP_ID) {
  algoliaSearch = {
    algolia: {
      appId: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_API_KEY,
      indexName: process.env.ALGOLIA_INDEX_NAME,
      contextualSearch: true,
    },
  };
}

let gtm = {};
if (process.env.GTM_CONTAINER_ID) {
  gtm = {
    googleTagManager: {
      containerId: process.env.GTM_CONTAINER_ID,
    },
  };
}
module.exports = {
  title: 'ShipFast.dev',
  tagline: 'The best free SaaS base for GenAI, LLM, and other AI Services. Ship your next Generative AI startups in days.',
  url: 'https://docs.shipfast.dev',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'ShipFast.dev',
  projectName: 'shipfast',
  themeConfig: {
    docs: {
      sidebar: {
        autoCollapseCategories: false,
      },
    },
    navbar: {
      title: 'ShipFast.dev',
      logo: {
        alt: 'ShipFast.dev',
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg',
      },
      items: [
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://github.com/vietanhdev/shipfast',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
        {
          href: 'https://www.shipfast.dev/',
          label: 'ShipFast\'s Website',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} ShipFast.dev by ShipFastTeam.`,
    },
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    ...algoliaSearch,
  },
  customFields: {
    projectName: 'ShipFast',
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.css')],
        },
        ...gtm,
      },
    ],
  ],
  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'typedoc-webapp-api-client',
        entryPoints: [
          '../../webapp-libs/webapp-api-client/src/hooks/index.ts',
          '../../webapp-libs/webapp-api-client/src/providers/index.ts',
          '../../webapp-libs/webapp-api-client/src/tests/utils/rendering.tsx',
          '../../webapp-libs/webapp-api-client/src/tests/utils/fixtures.ts',
        ],
        tsconfig: '../../webapp-libs/webapp-api-client/tsconfig.lib.json',
        out: 'api-reference/webapp-api-client/generated',
        readme: 'none',
        watch: process.env.TYPEDOC_WATCH,
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'typedoc-webapp-core',
        entryPoints: [
          '../../webapp-libs/webapp-core/src/utils/index.ts',
          '../../webapp-libs/webapp-core/src/hooks/index.ts',
          '../../webapp-libs/webapp-core/src/theme/index.ts',
          '../../webapp-libs/webapp-core/src/components/buttons/index.ts',
          '../../webapp-libs/webapp-core/src/components/forms/index.ts',
          '../../webapp-libs/webapp-core/src/tests/utils/rendering.tsx',
        ],
        tsconfig: '../../webapp-libs/webapp-core/tsconfig.lib.json',
        out: 'api-reference/webapp-core/generated',
        readme: 'none',
        watch: process.env.TYPEDOC_WATCH,
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'typedoc-webapp',
        entryPoints: [
          '../../webapp/src/app/providers/index.ts',
          '../../webapp/src/shared/components/routes/index.ts',
          '../../webapp/src/shared/utils/storybook.tsx',
          '../../webapp/src/tests/utils/rendering.tsx',
        ],
        tsconfig: '../../webapp/tsconfig.app.json',
        out: 'api-reference/webapp/generated',
        readme: 'none',
        watch: process.env.TYPEDOC_WATCH,
      },
    ],
  ],
};
