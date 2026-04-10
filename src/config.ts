export const site = {
  title: 'Apache Wicket',
  description: 'Apache Wicket is a component-oriented, type-safe Java web application framework. Production-proven for over twenty years.',
  url: 'https://wicket.apache.org',
} as const;

export const wicket = {
  version: '10.8.0',
  version90: '9.22.0',
  version80: '8.17.0',
  released: '2025-12-30',
  javaBaseline: '17',
  versions: [
    { branch: '10.x', version: '10.8.0', status: 'current, supported', java: '17+' },
    { branch: '9.x', version: '9.22.0', status: 'supported', java: '11+' },
    { branch: '8.x', version: '8.17.0', status: 'security fixes only', java: '8+' },
  ],
  archetype: {
    groupId: 'org.apache.wicket',
    artifactId: 'wicket-archetype-quickstart',
  },
  liveExamplesUrl: 'https://examples10x.wicket.apache.org/',
  guideBaseUrl: 'https://nightlies.apache.org/wicket/guide',
  javadocBaseUrl: 'https://nightlies.apache.org/wicket/apidocs',
} as const;

export const navigation = [
  { text: 'Get Started', href: '/start/quickstart' },
  { text: 'Documentation', href: '/docs' },
  { text: 'Community', href: '/community' },
  { text: 'Blog', href: '/blog' },
  { text: 'GitHub', href: 'https://github.com/apache/wicket', external: true },
] as const;
