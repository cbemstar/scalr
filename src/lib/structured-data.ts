import { siteConfig } from "@/config/site"
import { faqItems } from "@/data/faq"

type SiteConfig = typeof siteConfig

export function buildOrganizationJsonLd(config: SiteConfig) {
  const url = config.url
  const { business } = config
  const socialProfiles = Object.values(config.social)
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${url}/#organization`,
    name: config.name,
    url,
    logo: `${url}/social/scalr-facebook-profile.png`,
    image: `${url}/social/scalr-facebook-cover.png`,
    description: config.description,
    email: config.contact.email,
    telephone: config.contact.phone,
    identifier: {
      "@type": "PropertyValue",
      name: "NZBN",
      value: business.nzbn,
      description: "New Zealand Business Number (public register)",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Christchurch",
      addressCountry: "NZ",
    },
    areaServed: {
      "@type": "Country",
      name: "New Zealand",
    },
    sameAs: socialProfiles,
  }
}

export function buildWebSiteJsonLd(config: SiteConfig) {
  const url = config.url
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    name: config.name,
    url,
    description: config.description,
    publisher: { "@id": `${url}/#organization` },
    inLanguage: config.locale,
  }
}

export function buildPersonJsonLd(config: SiteConfig) {
  const url = config.url
  const { founder } = config
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${url}/#founder`,
    name: founder.name,
    jobTitle: founder.jobTitle,
    url: founder.sameAs[0],
    sameAs: [...founder.sameAs],
    worksFor: { "@id": `${url}/#organization` },
  }
}

export function buildFaqPageJsonLd(config: SiteConfig) {
  const url = config.url
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}/#faq`,
    isPartOf: { "@id": `${url}/#website` },
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function buildServiceOffersJsonLd(config: SiteConfig) {
  const url = config.url
  const packages = [...config.packages, ...config.ecommercePackages]
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${url}/#service-offers`,
    name: `${config.name} packages`,
    itemListElement: packages.map((pkg, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Offer",
        name: `${pkg.name} — ${pkg.tagline}`,
        description: pkg.comparison.youGet,
        price: pkg.price,
        priceCurrency: pkg.currency,
        availability: "https://schema.org/InStock",
        url: `${url}/#pricing`,
        seller: { "@id": `${url}/#organization` },
      },
    })),
  }
}

export function buildSiteJsonLdGraph(config: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationJsonLd(config),
      buildWebSiteJsonLd(config),
      buildPersonJsonLd(config),
    ],
  }
}

export function buildHomeExtraJsonLdGraph(config: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@graph": [buildFaqPageJsonLd(config), buildServiceOffersJsonLd(config)],
  }
}
