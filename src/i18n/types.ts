export type Locale = "es" | "en";

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqGroup {
  id: string;
  label: string;
  items: FaqItem[];
}

export interface HowFeature {
  id: string;
  title: string;
  text: string;
  prompt: string;
}

export interface CapabilityItem {
  title: string;
  text: string;
}

export interface TrustItem {
  title: string;
  text: string;
}

export interface ProofItem {
  title: string;
  text: string;
  href: string;
  external?: boolean;
}

export interface ProofTab {
  id: string;
  title: string;
  text: string;
  caption: string;
}

export interface EditionCard {
  name: string;
  title: string;
  text: string;
  cta: string;
  href: string;
}

export interface Dictionary {
  seo: {
    title: string;
    description: string;
  };
  nav: {
    how: string;
    editions: string;
    trust: string;
    faq: string;
    download: string;
    github: string;
    login: string;
    langLabel: string;
    langEs: string;
    langEn: string;
    menu: string;
    close: string;
    main: string;
    product: string;
    resources: string;
    pricing: string;
    contact: string;
    blog: string;
    manuals: string;
    productCol: string;
    editionsCol: string;
    learnCol: string;
    projectCol: string;
    howHint: string;
    editionsHint: string;
    trustHint: string;
    localFirstHint: string;
    proHint: string;
    studyHint: string;
    devHint: string;
    blogHint: string;
    manualsHint: string;
    faqHint: string;
    githubHint: string;
    changelogHint: string;
  };
  content: {
    read: string;
    updated: string;
    minutes: string;
    related: string;
    toc: string;
    published: string;
    tags: string;
    next: string;
    prev: string;
    rss: string;
    open: string;
    more: string;
    demoNote: string;
    contactDirect: string;
    transcript: string;
    featured: string;
    morePosts: string;
    backTo: string;
    all: string;
    search: string;
    searchPlaceholder: string;
    noMatches: string;
    topics: string;
    authorRole: string;
  };
  hero: {
    eyebrow: string;
    h1: string;
    h1Before: string;
    h1Accent: string;
    h1After: string;
    h1Lead: string;
    h1Documentos: string;
    h1Mid: string;
    h1Acciones: string;
    h1Mid2: string;
    h1Contexto: string;
    h1End: string;
    subhead: string;
    primaryCta: string;
    secondaryCta: string;
    proof: string;
    pillars: {
      documentos: string;
      personas: string;
      many: string;
    };
    shotPending: string;
  };
  shell: {
    home: string;
    projects: string;
    people: string;
    email: string;
    social: string;
    agents: string;
    marketplace: string;
    settings: string;
    tab: string;
    many: string;
    chat: string;
    compose: string;
  };
  workflow: {
    demoLabel: string;
    resourceTitle: string;
    resourceKind: string;
    resourceMeta: string;
    resourceExcerpt: string;
    personName: string;
    personRole: string;
    personNext: string;
    personHistory: string;
    draftLabel: string;
    draftSubject: string;
    draftBody: string;
    approvalState: string;
    sendLabel: string;
  };
  how: {
    h2: string;
    lead: string;
    cta: string;
    features: HowFeature[];
  };
  pro: {
    eyebrow: string;
    h2: string;
    body: string;
    examples: string[];
    cta: string;
  };
  editions: {
    h2: string;
    intro: string;
    note: string;
    proCta: string;
    study: EditionCard;
    dev: EditionCard;
  };
  capabilities: {
    h2: string;
    items: CapabilityItem[];
  };
  trust: {
    h2: string;
    lead: string;
    items: TrustItem[];
    rightTitle: string;
    rightText: string;
    controls: string[];
    proofLabel: string;
    localFirst: string;
    privacy: string;
    license: string;
  };
  proof: {
    h2: string;
    lead: string;
    items: ProofItem[];
    tabs: ProofTab[];
    approvalCaption: string;
  };
  faq: {
    h2: string;
    intro: string;
    help: string;
    support: string;
    groups: FaqGroup[];
  };
  finalCta: {
    h2: string;
    lead: string;
    primary: string;
    secondary: string;
  };
  footer: {
    tag: string;
    product: string;
    editionsCol: string;
    resources: string;
    project: string;
    legal: string;
    how: string;
    editions: string;
    trust: string;
    faq: string;
    download: string;
    changelog: string;
    github: string;
    license: string;
    contact: string;
    email: string;
    privacy: string;
    terms: string;
    manual: string;
    localFirst: string;
    pro: string;
    study: string;
    dev: string;
    blog: string;
    pricing: string;
    rss: string;
    rights: string;
  };
  legal: {
    back: string;
    updated: string;
    privacyTitle: string;
    privacyEyebrow: string;
    privacyDescription: string;
    termsTitle: string;
    termsEyebrow: string;
    termsDescription: string;
  };
  pages: {
    pro: SubpageCopy;
    study: SubpageCopy;
    dev: SubpageCopy;
    localFirst: SubpageCopy;
    manual: SubpageCopy;
    blog: SubpageCopy;
    contact: SubpageCopy;
    pricing: PricingPageCopy;
  };
}

export interface PricingPageCopy extends SubpageCopy {
  tba: string;
  tbaTitle: string;
  tbaBody: string;
}

export interface SubpageCopy {
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  sections: { h2: string; text: string }[];
  primary: string;
  secondary: string;
}
