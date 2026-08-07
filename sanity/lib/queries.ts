const IMG = `{
  "src": asset->url + "?auto=format&q=80",
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "alt": coalesce(alt, "")
}`;

const LINK = `{ label, href, newTab }`;

const LOGO = `{ "image": image${IMG}, "scale": coalesce(scale, 1) }`;

const CTA = `{ heading, "image": image${IMG}, button${LINK} }`;

const SETTINGS = `"settings": *[_type == "siteSettings"][0]{
  siteName,
  "navLinks": navLinks[]${LINK},
  bookCall${LINK},
  footerLead,
  email,
  "socialLinks": socialLinks[]${LINK}
}`;

const PRACTICE_ITEM = `{
  number, title, promise,
  homeBody, homeTheme,
  "landscape": landscape${IMG},
  detailTheme,
  overview,
  "approach": approach[]{ title, body },
  capabilities,
  deliverables,
  "detailImage": detailImage${IMG}
}`;

const PROJECT = `{
  title,
  "slug": slug.current,
  cardHeader,
  cardSubheader,
  "cardLogos": cardLogos[]${LOGO},
  "cardImage": cardImage${IMG},
  theme,
  indexTagline,
  indexBody,
  "indexImage": indexImage${IMG},
  hasDetailPage,
  detailTagline,
  detailCollaborators,
  "detailImage": detailImage${IMG},
  "chapters": chapters[]{ label, lead, emphasis, paragraphs, quotes },
  snapshotsHeading,
  snapshotsCaption,
  "snapshotsImages": snapshotsImages[]${IMG}
}`;

export const homeQuery = `{
  ${SETTINGS},
  "page": *[_type == "homePage"][0]{
    heroHeading, heroBody, heroPrimary${LINK}, clientsLabel,
    breatherStatement, breatherLead, breatherCta${LINK},
    founderName, founderRole, "founderPortrait": founderPortrait${IMG},
    "showcaseDesktop": showcaseDesktop${IMG}, "showcaseMobile": showcaseMobile${IMG},
    testimonialsLabel, testimonialsCta${LINK},
    workHeading,
    practiceIntroHeading, practiceOverviewStatement, practiceOverviewBody,
    cta${CTA}
  },
  "clients": *[_type == "client"] | order(orderRank){ name, "logo": logo${IMG}, "scale": coalesce(scale, 1) },
  "testimonials": *[_type == "testimonial"] | order(orderRank){ quote, source },
  "projects": *[_type == "project" && featuredOnHome != false] | order(orderRank)${PROJECT},
  "practices": *[_type == "practiceItem"] | order(orderRank)${PRACTICE_ITEM}
}`;

export const aboutQuery = `{
  ${SETTINGS},
  "page": *[_type == "aboutPage"][0]{
    heroHeading, heroCopy, heroCta${LINK},
    studioTitle, studioLead, studioBody, founderBio, founderName, founderRole,
    "studioPortrait": studioPortrait${IMG},
    transformHeading, "transformPairs": transformPairs[]{ from, to, description },
    methodTitle, "methodSteps": methodSteps[]{ name, promise, capabilities }, methodCta${LINK},
    cta${CTA}
  }
}`;

export const workQuery = `{
  ${SETTINGS},
  "page": *[_type == "workPage"][0]{ heroTitle, heroSub, cta${CTA} },
  "projects": *[_type == "project"] | order(orderRank)${PROJECT}
}`;

export const projectSlugsQuery = `*[_type == "project" && hasDetailPage == true && defined(slug.current)].slug.current`;

export const projectQuery = `{
  ${SETTINGS},
  "workCta": *[_type == "workPage"][0].cta${CTA},
  "project": *[_type == "project" && slug.current == $slug][0]${PROJECT}
}`;

export const practiceQuery = `{
  ${SETTINGS},
  "page": *[_type == "practicePage"][0]{ heroMeta, heroTitle, heroSub, cta${CTA} },
  "practices": *[_type == "practiceItem"] | order(orderRank)${PRACTICE_ITEM}
}`;

export const contactQuery = `{
  ${SETTINGS},
  "page": *[_type == "contactPage"][0]{ heading, copy, calendlyUrl, calendlyLabel, writeLabel }
}`;

export const notFoundQuery = `{
  ${SETTINGS},
  "page": *[_type == "notFoundPage"][0]{ code, heading, copy, buttonLabel }
}`;
