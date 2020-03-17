export default {
  SHORTNAME: process.env.VUE_APP_SHORTNAME || "p2030",
  URL: process.env.VUE_APP_BACKEND_URL || "http://localhost:5000",
  GOOGLE_ANALYTICS: process.env.VUE_APP_GOOGLE_ANALYTICS || "XXXXXXXXXXXX",
  USE_ALERTS: process.env.VUE_APP_USE_ALERTS || false,
  SCANNER_HELPTEXT: process.env.VUE_APP_SCANNER_HELPTEXT || "",
  MENU: [
    {
      route: "search",
      name: "Buscar",
      condition: true
    },
    {
      route: "ods",
      name: "ODS",
      condition: true
    },
    {
      route: "dashboard",
      name: "Métricas",
      condition: true
    },
    {
      route: "scanner",
      name: "Scanner",
      condition: true
    },
    {
      route: "alerts",
      name: "Alertas",
      condition: false
    },
    {
      route: "about",
      name: "Acerca",
      condition: true
    }
  ],
  DISCLAIMER: {
    route: "about-en",
    name: "Learn more about this project in English"
  },
  LOGO: "/img/logo.svg",

  DEFAULT_PAGE_TITLE: "TIPI Ciudadano",
  DEFAULT_METATAGS: [
    {
      name: "description",
      content:
        "Es un proyecto que nace desde la sociedad civil para fortalecer sus capacidades de incidencia en los procesos de toma de decisión política y en la generación de un debate público informado sobre la pobreza y la justicia social en España."
    },
    {
      name: "keywords",
      content:
        "transparencia, incidencia política, participación, investigación, periodismo de datos, política, españa, congreso de los diputados, monitorización parlamentaria, ods, sdg, agenda 2030, objetivos de desarrollo sostenible, sustainable development goals"
    },
    {
      itemprop: "image",
      content:
        "https://ciecode.es/assets/images/projects/tipi-ciudadano/tipi-ciudadano.png"
    },
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "twitter:url",
      content: "http://tipiciudadano.es"
    },
    {
      name: "twitter:title",
      content: "TIPI Ciudadano"
    },
    {
      name: "twitter:description",
      content:
        "Es un proyecto que nace desde la sociedad civil para fortalecer sus capacidades de incidencia en los procesos de toma de decisión política y en la generación de un debate público informado sobre la pobreza y la justicia social en España."
    },
    {
      name: "twitter:creator",
      content: "@ciecode"
    },
    {
      name: "twitter:image:src",
      content:
        "https://ciecode.es/assets/images/projects/tipi-ciudadano/tipi-ciudadano.png"
    },
    {
      property: "og:title",
      content: "TIPI Ciudadano"
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:url",
      content: "http://www.tipiciudadano.es"
    },
    {
      property: "og:image",
      content:
        "https://ciecode.es/assets/images/projects/tipi-ciudadano/tipi-ciudadano.png"
    },
    {
      property: "og:description",
      content:
        "Es un proyecto que nace desde la sociedad civil para fortalecer sus capacidades de incidencia en los procesos de toma de decisión política y en la generación de un debate público informado sobre la pobreza y la justicia social en España."
    },
    {
      property: "og:site_name",
      content: "TIPI Ciudadano"
    }
  ],
  STYLES: {
    topics: {
      "Conductas adictivas": {
        shortname: "Conductas adictivas",
        color: "#FBC239",
        image: "adictivas-01.svg"
      },
      "Vivienda": {
        shortname: "Vivienda",
        color: "#FBC239",
        image: "vivienda-01.svg"
      },
      "Comercio internacional": {
        shortname: "Comercio internacional",
        color: "#FBC239",
        image: "comercio-01.svg"
      },
      "Población gitana": {
        shortname: "Población gitana",
        color: "#FBC239",
        image: "gitana-01.svg"
      },
      "Democracia y Derechos en la era digital": {
        shortname: "Democracia y Derechos en la era digital",
        color: "#FBC239",
        image: "digitales-01.svg"
      },
      "Protección social": {
        shortname: "Protección social",
        color: "#FBC239",
        image: "proteccion-01.svg"
      },
      "Cooperación al desarrollo": {
        shortname: "Cooperación al desarrollo",
        color: "#FBC239",
        image: "cooperacion-01.svg"
      },
      "Infancia": {
        shortname: "Infancia",
        color: "#FBC239",
        image: "infancia-01.svg"
      },
      "Conflictos internacionales y construcción de paz": {
        shortname: "Conflictos internacionales y construcción de paz",
        color: "#FBC239",
        image: "paz-01.svg"
      },
      "Fiscalidad": {
        shortname: "Fiscalidad",
        color: "#FBC239",
        image: "fiscalidad-01.svg"
      },
      "Personas sin hogar": {
        shortname: "Personas sin hogar",
        color: "#FBC239",
        image: "sintecho-01.svg"
      },
      "Migraciones": {
        shortname: "Migraciones",
        color: "#FBC239",
        image: "extranjera-01.svg"
      },
      "Calidad democrática": {
        shortname: "Calidad democrática",
        color: "#FBC239",
        image: "democracia-01.svg"
      },
      "Educación": {
        shortname: "Educación",
        color: "#FBC239",
        image: "educacion-01.svg"
      },
      "Sanidad": {
        shortname: "Sanidad",
        color: "#FBC239",
        image: "sanidad-01.svg"
      },
      "Cambio climático y política energética": {
        shortname: "Cambio climático y política energética",
        color: "#FBC239",
        image: "clima-01.svg"
      },
      "Población reclusa": {
        shortname: "Población reclusa",
        color: "#FBC239",
        image: "reclusa-01.svg"
      },
      "Empleo": {
        shortname: "Empleo",
        color: "#FBC239",
        image: "empleo-01.svg"
      },
      "Personas con discapacidad": {
        shortname: "Personas con discapacidad",
        color: "#FBC239",
        image: "diversidad-01.svg"
      },
      "Igualdad de género": {
        shortname: "Igualdad de género",
        color: "#FBC239",
        image: "igualdad-01.svg"
      },
      "Personas mayores": {
        shortname: "Personas mayores",
        color: "#FBC239",
        image: "mayores-01.svg"
      },
      "Dependencia": {
        shortname: "Dependencia",
        color: "#FBC239",
        image: "dependencia-01.svg"
      },
      "no-topic": {
        shortname: "Sin temática"
      }
    },
    subtopics: {
    },
    defaultColor: "#cecece",
    defaultImage: "placeholder.png"
  }
};
