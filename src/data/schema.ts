import { SITE_CONFIG, SITE_UPDATED } from './config';

const base = SITE_CONFIG.domain;
export const absUrl = (path = '/') => new URL(path, base).toString();

export const IDS = {
  org: `${base}/#organizacao`,
  site: `${base}/#website`,
  person: `${base}/sobre/#samir-trindade`,
  logo: `${base}/#logo`,
};

export interface Crumb { name: string; url?: string }
export interface FaqItem { question: string; answer: string }
export interface ServiceInfo { name: string; description: string; areaServed?: string }
export interface ArticleInfo {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
}
export interface GraphOptions {
  path: string;
  title: string;
  description: string;
  pageType?: 'home' | 'page' | 'contact' | 'about' | 'service' | 'article';
  crumbs?: Crumb[];
  faq?: FaqItem[];
  service?: ServiceInfo;
  article?: ArticleInfo;
  datePublished?: string;
  dateModified?: string;
  catalog?: { name: string; url: string; description: string }[];
}

const geo = {
  '@type': 'GeoCoordinates',
  latitude: SITE_CONFIG.geo.latitude,
  longitude: SITE_CONFIG.geo.longitude,
};

function businessNode(catalog?: GraphOptions['catalog']) {
  const node: Record<string, unknown> = {
    '@type': ['InsuranceAgency', 'LocalBusiness'],
    '@id': IDS.org,
    name: SITE_CONFIG.shortName,
    legalName: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: absUrl('/'),
    logo: {
      '@type': 'ImageObject',
      '@id': IDS.logo,
      url: absUrl(SITE_CONFIG.ogImage),
      width: SITE_CONFIG.ogImageSize.width,
      height: SITE_CONFIG.ogImageSize.height,
    },
    image: absUrl(SITE_CONFIG.ogImage),
    telephone: SITE_CONFIG.telefone,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.zip,
      addressCountry: SITE_CONFIG.address.country,
    },
    geo,
    hasMap: SITE_CONFIG.maps,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '15:00',
      },
    ],
    areaServed: SITE_CONFIG.areaServed.map((name) => ({
      '@type': 'City',
      name,
    })),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE_CONFIG.telefone,
      contactType: 'sales',
      areaServed: 'BR',
      availableLanguage: 'Portuguese',
    },
    sameAs: [SITE_CONFIG.social.instagram],
    founder: { '@id': IDS.person },
    employee: { '@id': IDS.person },
  };
  if (catalog && catalog.length) {
    node.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: 'Planos de saúde por operadora',
      itemListElement: catalog.map((c) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: c.name, url: c.url, description: c.description },
      })),
    };
  }
  return node;
}

export function buildGraph(o: GraphOptions) {
  const url = absUrl(o.path);
  const pageType = o.pageType ?? 'page';
  const wpType =
    pageType === 'contact' ? 'ContactPage' : pageType === 'about' ? 'AboutPage' : 'WebPage';

  const graph: Record<string, unknown>[] = [
    businessNode(pageType === 'home' ? o.catalog : undefined),
    {
      '@type': 'Person',
      '@id': IDS.person,
      name: SITE_CONFIG.author,
      description: SITE_CONFIG.authorBio,
      jobTitle: 'Corretor de planos de saúde',
      url: absUrl('/sobre/'),
      worksFor: { '@id': IDS.org },
      sameAs: [SITE_CONFIG.social.instagram],
      identifier: { '@type': 'PropertyValue', name: 'Registro ANS', value: SITE_CONFIG.ansRegister },
    },
    {
      '@type': 'WebSite',
      '@id': IDS.site,
      url: absUrl('/'),
      name: SITE_CONFIG.shortName,
      inLanguage: 'pt-BR',
      publisher: { '@id': IDS.org },
    },
  ];

  const page: Record<string, unknown> = {
    '@type': wpType,
    '@id': `${url}#webpage`,
    url,
    name: o.title,
    description: o.description,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': IDS.site },
    about: { '@id': IDS.org },
    datePublished: o.datePublished ?? SITE_UPDATED,
    dateModified: o.dateModified ?? SITE_UPDATED,
  };
  if (o.crumbs && o.crumbs.length > 1) page.breadcrumb = { '@id': `${url}#breadcrumb` };
  graph.push(page);

  if (o.crumbs && o.crumbs.length > 1) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: o.crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: c.url ? absUrl(c.url) : url,
      })),
    });
  }

  if (o.service) {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#servico`,
      name: o.service.name,
      description: o.service.description,
      url,
      serviceType: 'Corretagem de plano de saúde',
      provider: { '@id': IDS.org },
      areaServed: { '@type': 'City', name: o.service.areaServed ?? 'Rio de Janeiro' },
      mainEntityOfPage: { '@id': `${url}#webpage` },
    });
  }

  if (o.article) {
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${url}#artigo`,
      headline: o.article.headline.slice(0, 110),
      description: o.article.description,
      image: o.article.image,
      url,
      datePublished: o.article.datePublished,
      dateModified: o.article.dateModified,
      inLanguage: 'pt-BR',
      author: { '@id': IDS.person },
      publisher: { '@id': IDS.org },
      mainEntityOfPage: { '@id': `${url}#webpage` },
    });
  }

  if (o.faq && o.faq.length >= 2) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      isPartOf: { '@id': `${url}#webpage` },
      mainEntity: o.faq.map((q) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: { '@type': 'Answer', text: q.answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
