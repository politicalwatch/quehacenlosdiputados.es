export default {
  SHORTNAME: process.env.VUE_APP_SHORTNAME || "qhld",
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
    route: "",
    name: "",
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
        "https://ciecode.es/assets/images/projects/qhld/qhld.png"
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
        "https://ciecode.es/assets/images/projects/qhld/qhld.png"
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
        "https://ciecode.es/assets/images/projects/qhld/qhld.png"
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
      "ODS 1 Fin de la pobreza": {
        shortname: "ODS 1",
        color: "#eb1c2d",
        image: "ods-1.svg",
        orgs_logos: ["caritas.png"]
      },
      "ODS 2 Hambre cero": {
        shortname: "ODS 2",
        color: "#d3a029",
        image: "ods-2.svg",
        orgs_logos: ["fao.png"]
      },
      "ODS 3 Salud y bienestar": {
        shortname: "ODS 3",
        color: "#4c9f38",
        image: "ods-3.svg",
        orgs_logos: ["salud_por_der.png","isglobal.png"]
      },
      "ODS 4 Educación de calidad": {
        shortname: "ODS 4",
        color: "#c52333",
        image: "ods-4.svg",
        orgs_logos: ["cmi.png"]
      },
      "ODS 5 Igualdad de género": {
        shortname: "ODS 5",
        color: "#ed4135",
        image: "ods-5.svg",
        orgs_logos: ["cedawsombra.png","coordinadora.png","fpfe_g.png"]
      },
      "ODS 6 Agua limpia y saneamiento": {
        shortname: "ODS 6",
        color: "#00aed9",
        image: "ods-6.svg",
        orgs_logos: ["catedra-aquae.png","ongawa.png"]
      },
      "ODS 7 Energía asequible y no contaminante": {
        shortname: "ODS 7",
        color: "#fdb713",
        image: "ods-7.svg",
        orgs_logos: ["esf.png"]
      },
      "ODS 8 Trabajo decente y crecimiento económico": {
        shortname: "ODS 8",
        color: "#8f1838",
        image: "ods-8.svg",
        orgs_logos: ["ccoo.png"]
      },
      "ODS 9 Industria, innovación e infraestructura": {
        shortname: "ODS 9",
        color: "#f06a38",
        image: "ods-9.svg",
        orgs_logos: ["foretica.png"]
      },
      "ODS 10 Reducción de las desigualdades": {
        shortname: "ODS 10",
        color: "#dd1367",
        image: "ods-10.svg",
        orgs_logos: ["congde.png", "caritas.png"]
      },
      "ODS 11 Ciudades y comunidades sostenibles": {
        shortname: "ODS 11",
        color: "#f69c39",
        image: "ods-11.svg",
        orgs_logos: ["idl_uam.png", "itgespub.png"]
      },
      "ODS 12 Producción y consumo responsables": {
        shortname: "ODS 12",
        color: "#cf8d2a",
        image: "ods-12.svg",
        orgs_logos: ["hispacoop.png"]
      },
      "ODS 13 Acción por el clima": {
        shortname: "ODS 13",
        color: "#48773e",
        image: "ods-13.svg",
        orgs_logos: ["wwf.png"]
      },
      "ODS 14 Vida submarina": {
        shortname: "ODS 14",
        color: "#007dbc",
        image: "ods-14.svg",
        orgs_logos: ["oceana.png"]
      },
      "ODS 15 Vida de ecosistemas terrestres": {
        shortname: "ODS 15",
        color: "#5cb84d",
        image: "ods-15.svg",
        orgs_logos: ["greenpeace.png"]
      },
      "ODS 16 Paz, justicia e instituciones sólidas": {
        shortname: "ODS 16",
        color: "#02558b",
        image: "ods-16.svg",
        orgs_logos: []
      },
      "ODS 17 Alianzas para lograr los objetivos": {
        shortname: "ODS 17",
        color: "#183668",
        image: "ods-17.svg",
        orgs_logos: ["mauec.png"]
      },
    },
    subtopics: {
    },
    defaultColor: "#cecece",
    defaultImage: "placeholder.png"
  }
};
