// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'KickstartSelfhostedServices',
  tagline: 'Selfhostedl',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://lefterisALEX.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/kickstart-selfhosted-pages',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'lefterisALEX', // Usually your GitHub org/user name.
  projectName: 'kickstart-selfhosted-pages', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
        },
        blog: false,
      }),
    ],
  ],
  // presets: [
  //   [
  //     'classic',
  //     /** @type {import('@docusaurus/preset-classic').Options} */
  //     ({
  //       docs: {
  //         sidebarPath: './sidebars.js',
  //         // Please change this to your repo.
  //         // Remove this to remove the "edit this page" links.
  //         editUrl:
  //           'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
  //       },
  //       blog: {
  //         showReadingTime: true,
  //         feedOptions: {
  //           type: ['rss', 'atom'],
  //           xslt: true,
  //         },
  //         // Please change this to your repo.
  //         // Remove this to remove the "edit this page" links.
  //         editUrl:
  //           'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
  //         // Useful options to enforce blogging best practices
  //         onInlineTags: 'warn',
  //         onInlineAuthors: 'warn',
  //         onUntruncatedBlogPosts: 'warn',
  //       },
  //       theme: {
  //         customCss: './src/css/custom.css',
  //       },
  //     }),
  //   ],
  // ],
  themeConfig:
    ({
      image: 'img/<open-graph-card>',
      navbar: {
        title: 'Kickstart Selfhosted Services',
        // logo: {
        //   alt: '<logo-alt>',
        //   src: 'img/<logo-file>'
        // },
        items: [
          {
            type: 'doc',
            sidebarId: 'docsSidebar',
            docId: 'index',  // Replace with your actual root document ID
            label: 'Docs',
            position: 'left'
          },
          {
            href: 'https://github.com/lefterisALEX/kickstart-selfhosted-pages',
            position: 'right'  // Optional: positions GitHub link on right side
          }
        ]
      },
      colorMode: {
        respectPrefersColorScheme: true,
        disableSwitch: true // This disables the color scheme switch
      }
    }),
  // themeConfig:
  //   /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  //   ({
  //     // Replace with your project's social card
  //     image: 'img/docusaurus-social-card.jpg',
  //     navbar: {
  //       title: 'CloudStack',
  //       logo: {
  //         alt: 'My Site Logo',
  //         src: 'img/logo.svg',
  //       },
  //       items: [
  //         {
  //           type: 'docSidebar',
  //           sidebarId: 'tutorialSidebar',
  //           position: 'left',
  //           label: 'Tutorial',
  //         },
  //         // {to: '/blog', label: 'Blog', position: 'left'},
  //         {
  //           href: 'https://github.com/lefterisALEX/kickstart-selfhosted-services',
  //           label: 'GitHub',
  //           position: 'right',
  //         },
  //       ],
  //     },
  //     footer: {
  //       style: 'dark',
  //       links: [
  //         {
  //           title: 'Docs',
  //           items: [
  //             {
  //               label: 'Tutorial',
  //               to: '/docs/intro',
  //             },
  //           ],
  //         },
  //         {
  //           title: 'Community',
  //           items: [
  //             {
  //               label: 'Stack Overflow',
  //               href: 'https://stackoverflow.com/questions/tagged/docusaurus',
  //             },
  //             {
  //               label: 'Discord',
  //               href: 'https://discordapp.com/invite/docusaurus',
  //             },
  //             {
  //               label: 'X',
  //               href: 'https://x.com/docusaurus',
  //             },
  //           ],
  //         },
  //         {
  //           title: 'More',
  //           items: [
  //             {
  //               label: 'Blog',
  //               to: '/blog',
  //             },
  //             {
  //               label: 'GitHub',
  //               href: 'https://github.com/facebook/docusaurus',
  //             },
  //           ],
  //         },
  //       ],
  //       copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
  //     },
  //     prism: {
  //       theme: prismThemes.github,
  //       darkTheme: prismThemes.dracula,
  //     },
  //   }),
};

export default config;
