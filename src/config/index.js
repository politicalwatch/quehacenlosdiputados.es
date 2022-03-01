export default {
  SHORTNAME: process.env.VUE_APP_SHORTNAME || "tipi",
  BACKEND_URL: process.env.VUE_APP_BACKEND_URL || "http://localhost:5000",
  HOMEBUILDER_URL: process.env.VUE_APP_HOMEBUILDER_URL || "https://homebuilder.quehacenlosdiputados.es",
  GOOGLE_ANALYTICS: process.env.VUE_APP_GOOGLE_ANALYTICS || "XXXXXXXXXXXX",
  USE_ALERTS: process.env.VUE_APP_USE_ALERTS || false,
  KNOWLEDGEBASE: process.env.KNOWLEDGEBASE || 'politicas',
  SCANNER_HELPTEXT: process.env.VUE_APP_SCANNER_HELPTEXT || "",
  MENU: [
    {
      route: "deputies",
      name: "Diputados",
      condition: true
    },
    {
      route: "parliamentarygroups",
      name: "Grupos",
      condition: true
    },
    {
      route: "search",
      name: "Iniciativas",
      condition: true
    },
    {
      route: "manifest",
      name: "Manifiesto",
      condition: true
    }
  ],
  DISCLAIMER: {
    route: "https://www.parlamento2030.es?utm_source=tipiciudadano&utm_medium=direct&utm_campaign=engagement",
    name: "<img src='/img/sdg.png' alt='Logo de los ODS'> Descubre la actividad parlamentaria en clave Agenda 2030",
    external: true
  },
  LOGO: "/img/logo.svg",

  DEFAULT_PAGE_TITLE: "Qué hacen los diputados",
  DEFAULT_METATAGS: [
    {
      name: "description",
      content:
        "Que todos los días sean de puertas abiertas en el Congreso de los Diputados"
    },
    {
      name: "keywords",
      content:
        "transparencia, incidencia política, participación, investigación, periodismo de datos, política, pobreza, exclusión social, justicia social, españa, congreso de los diputados, monitorización parlamentaria"
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
      content: "https://quehacenlosdiputados.es"
    },
    {
      name: "twitter:title",
      content: "Qué hacen los diputados"
    },
    {
      name: "twitter:description",
      content:
        "Que todos los días sean de puertas abiertas en el Congreso de los Diputados"
    },
    {
      name: "twitter:creator",
      content: "@QHLD_"
    },
    {
      name: "twitter:image:src",
      content:
        "https://ciecode.es/assets/images/projects/tipi-ciudadano/tipi-ciudadano.png"
    },
    {
      property: "og:title",
      content: "Qué hacen los diputados"
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:url",
      content: "https://quehacenlosdiputados.es"
    },
    {
      property: "og:image",
      content:
        "https://ciecode.es/assets/images/projects/tipi-ciudadano/tipi-ciudadano.png"
    },
    {
      property: "og:description",
      content:
        "Que todos los días sean de puertas abiertas en el Congreso de los Diputados"
    },
    {
      property: "og:site_name",
      content: "Qué hacen los diputados"
    }
  ],
  STYLES: {
    topics: {
      "Conductas adictivas": {
        shortname: "Adicciones",
        color: "#A3D5C8",
        image: "adictivas-01.svg"
      },
      "Vivienda": {
        shortname: "Vivienda",
        color: "#A3D5C8",
        image: "vivienda-01.svg"
      },
      "Comercio internacional": {
        shortname: "Comercio internacional",
        color: "#A3D5C8",
        image: "comercio-01.svg"
      },
      "Población gitana": {
        shortname: "Población gitana",
        color: "#A3D5C8",
        image: "gitana-01.svg"
      },
      "Democracia y derechos en la era digital": {
        shortname: "Derechos digitales",
        color: "#A3D5C8",
        image: "digitales-01.svg"
      },
      "Protección social": {
        shortname: "Protección social",
        color: "#A3D5C8",
        image: "proteccion-01.svg"
      },
      "Cooperación al desarrollo": {
        shortname: "Cooperación al Desarrollo",
        color: "#A3D5C8",
        image: "cooperacion-01.svg"
      },
      "Infancia": {
        shortname: "Infancia",
        color: "#A3D5C8",
        image: "infancia-01.svg"
      },
      "Conflictos internacionales y construcción de paz": {
        shortname: "Conflictos y Paz",
        color: "#A3D5C8",
        image: "paz-01.svg"
      },
      "Fiscalidad": {
        shortname: "Fiscalidad",
        color: "#A3D5C8",
        image: "fiscalidad-01.svg"
      },
      "Personas sin hogar": {
        shortname: "Personas sin hogar",
        color: "#A3D5C8",
        image: "sintecho-01.svg"
      },
      "Migraciones": {
        shortname: "Migraciones",
        color: "#A3D5C8",
        image: "extranjera-01.svg"
      },
      "Calidad democrática": {
        shortname: "Democracia",
        color: "#A3D5C8",
        image: "democracia-01.svg"
      },
      "Educación": {
        shortname: "Educación",
        color: "#A3D5C8",
        image: "educacion-01.svg"
      },
      "Sanidad": {
        shortname: "Sanidad",
        color: "#A3D5C8",
        image: "sanidad-01.svg"
      },
      "Cambio climático y política energética": {
        shortname: "Energía y Clima",
        color: "#A3D5C8",
        image: "clima-01.svg"
      },
      "Población reclusa": {
        shortname: "Población reclusa",
        color: "#A3D5C8",
        image: "reclusa-01.svg"
      },
      "Empleo": {
        shortname: "Empleo",
        color: "#A3D5C8",
        image: "empleo-01.svg"
      },
      "Personas con discapacidad": {
        shortname: "Discapacidad",
        color: "#A3D5C8",
        image: "diversidad-01.svg"
      },
      "Igualdad de género": {
        shortname: "Igualdad de género",
        color: "#A3D5C8",
        image: "igualdad-01.svg"
      },
      "Personas mayores": {
        shortname: "Mayores",
        color: "#A3D5C8",
        image: "mayores-01.svg"
      },
      "Dependencia": {
        shortname: "Dependencia",
        color: "#A3D5C8",
        image: "dependencia-01.svg"
      },
      "Colectivo LGTBI": {
        shortname: "LGTBI",
        color: "#A3D5C8",
        image: "lgtbi-01.svg"
      },
    },
    subtopics: {
    },
    defaultColor: "#cecece",
    defaultImage: "placeholder.png"
  }
};
