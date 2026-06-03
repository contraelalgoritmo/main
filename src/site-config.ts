export const siteConfig = {
  title: "Contra el Algoritmo",
  description: "Un proyecto autogestionado que nace de una motivación común: recuperar la tecnología.",
  githubRepo: "contraelalgoritmo/main",
  site: import.meta.env.PUBLIC_SITE_URL,
  footerText: "Contra el Algoritmo",

  seo: {
    twitterHandle: import.meta.env.PUBLIC_TWITTER_HANDLE,
    twitterSite: import.meta.env.PUBLIC_SITE_URL,
  },
};

export const featureFlags = {
  enableImprint: false,
  enableDataprotection: false,
  showAttribution: false,
};

// Navigation menu items
export const nav = [
  {
    text: "Inicio",
    url: "/",
  },
  {
    text: "El proyecto",
    url: "#proyecto",
  },
  {
    text: "Cómo lo hacemos",
    url: "#como",
  },
];
