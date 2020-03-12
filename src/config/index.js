export default {
  SHORTNAME: process.env.VUE_APP_SHORTNAME || 'p2030',
  URL: process.env.VUE_APP_BACKEND_URL || 'http://localhost:5000',
  GOOGLE_ANALYTICS: process.env.VUE_APP_GOOGLE_ANALYTICS || 'XXXXXXXXXXXX',
  USE_ALERTS: process.env.VUE_APP_USE_ALERTS || false,
  SCANNER_HELPTEXT: process.env.VUE_APP_SCANNER_HELPTEXT || "",
  MENU: [
    {
      route : 'search',
      name: 'Buscar',
      condition: true,
    },
    {
      route: 'ods',
      name: 'ODS',
      condition: true,
    },
    {
      route: 'dashboard',
      name: 'Métricas',
      condition: true,
    },
    {
      route: 'scanner',
      name: 'Scanner',
      condition: true,
    },
    {
      route: 'alerts',
      name: 'Alertas',
      condition: false,
    },
    {
      route: 'about',
      name: 'Acerca',
      condition: true,
    },
  ],
  DISCLAIMER: {
    route: 'about-en',
    name: 'Learn more about this project in English',
  },
  LOGO: '/img/logo-beta.png',

  DEFAULT_PAGE_TITLE: 'Parlamento 2030',
  DEFAULT_METATAGS: [
    {
      name: 'description',
      content: 'Parlamento2030 es una innovadora herramienta que rastrea, reúne y ofrece la información sobre la actividad del Congreso de los Diputados español relacionada con los Objetivos de Desarrollo Sostenible. Diseñada para superar los retos que plantea la naturaleza transversal de la Agenda 2030, Parlamento 2030 clasifica la información relacionada con los ODS gracias a un avanzado sistema automático de etiquetado masivo. Esta innovadora tecnología permite a los usuarios navegar por la actividad parlamentaria relacionada con los ODS a través de un buscador online, abierto y gratuito. La información ofrecida es esencial de cara a la monitorización y la rendición de cuentas de la implementación de la Agenda 2030 a nivel nacional.'
    },
    {
      name: 'keywords',
      content: 'transparencia, incidencia política, participación, investigación, periodismo de datos, política, españa, congreso de los diputados, monitorización parlamentaria, ods, sdg, agenda 2030, objetivos de desarrollo sostenible, sustainable development goals'
    },
    {
      itemprop: 'image',
      content: 'https://ciecode.es/assets/images/projects/parlamento2030/parlamento2030.png'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:url',
      content: 'http://parlamento2030.es'
    },
    {
      name: 'twitter:title',
      content: 'Parlamento2030'
    },
    {
      name: 'twitter:description',
      content: 'Parlamento2030 es una innovadora herramienta que rastrea, reúne y ofrece la información sobre la actividad del Congreso de los Diputados español relacionada con los Objetivos de Desarrollo Sostenible.Diseñada para superar los retos que plantea la naturaleza transversal de la Agenda 2030, Parlamento 2030 clasifica la información relacionada con los ODS gracias a un avanzado sistema automático de etiquetado masivo.Esta innovadora tecnología permite a los usuarios navegar por la actividad parlamentaria relacionada con los ODS a través de un buscador online, abierto y gratuito.La información ofrecida es esencial de cara a la monitorización y la rendición de cuentas de la implementación de la Agenda 2030 a nivel nacional.'
    },
    {
      name: 'twitter:creator',
      content: '@ciecode'
    },
    {
      name: 'twitter:image:src',
      content: 'https://ciecode.es/assets/images/projects/parlamento2030/parlamento2030.png'
    },
    {
      property: 'og:title',
      content: 'Parlamento2030'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'http://www.parlamento2030.es'
    },
    {
      property: 'og:image',
      content: 'https://ciecode.es/assets/images/projects/parlamento2030/parlamento2030.png'
    },
    {
      property: 'og:description',
      content: 'Parlamento2030 es una innovadora herramienta que rastrea, reúne y ofrece la información sobre la actividad del Congreso de los Diputados español relacionada con los Objetivos de Desarrollo Sostenible. Diseñada para superar los retos que plantea la naturaleza transversal de la Agenda 2030, Parlamento 2030 clasifica la información relacionada con los ODS gracias a un avanzado sistema automático de etiquetado masivo. Esta innovadora tecnología permite a los usuarios navegar por la actividad parlamentaria relacionada con los ODS a través de un buscador online, abierto y gratuito. La información ofrecida es esencial de cara a la monitorización y la rendición de cuentas de la implementación de la Agenda 2030 a nivel nacional.'
    },
    {
      property: 'og:site_name',
      content: 'Parlamentp2030'
    },
  ],
  STYLES: {
    topics: {
      "ODS 1 Fin de la pobreza": {
        shortname: "ODS 1",
        color: "#eb1c2d",
        image: "ods-1.svg",
      },
      "ODS 2 Hambre cero": {
        shortname: "ODS 2",
        color: "#d3a029",
        image: "ods-2.svg",
      },
      "ODS 3 Salud y bienestar": {
        shortname: "ODS 3",
        color: "#4c9f38",
        image: "ods-3.svg",
      },
      "ODS 4 Educación de calidad": {
        shortname: "ODS 4",
        color: "#c52333",
        image: "ods-4.svg",
      },
      "ODS 5 Igualdad de género": {
        shortname: "ODS 5",
        color: "#ed4135",
        image: "ods-5.svg",
      },
      "ODS 6 Agua limpia y saneamiento": {
        shortname: "ODS 6",
        color: "#00aed9",
        image: "ods-6.svg",
      },
      "ODS 7 Energía asequible y no contaminante": {
        shortname: "ODS 7",
        color: "#fdb713",
        image: "ods-7.svg",
      },
      "ODS 8 Trabajo decente y crecimiento económico": {
        shortname: "ODS 8",
        color: "#8f1838",
        image: "ods-8.svg",
      },
      "ODS 9 Industria, innovación e infraestructura": {
        shortname: "ODS 9",
        color: "#f06a38",
        image: "ods-9.svg",
      },
      "ODS 10 Reducción de las desigualdades": {
        shortname: "ODS 10",
        color: "#dd1367",
        image: "ods-10.svg",
      },
      "ODS 11 Ciudades y comunidades sostenibles": {
        shortname: "ODS 11",
        color: "#f69c39",
        image: "ods-11.svg",
      },
      "ODS 12 Producción y consumo responsables": {
        shortname: "ODS 12",
        color: "#cf8d2a",
        image: "ods-12.svg",
      },
      "ODS 13 Acción por el clima": {
        shortname: "ODS 13",
        color: "#48773e",
        image: "ods-13.svg",
      },
      "ODS 14 Vida submarina": {
        shortname: "ODS 14",
        color: "#007dbc",
        image: "ods-14.svg",
      },
      "ODS 15 Vida de ecosistemas terrestres": {
        shortname: "ODS 15",
        color: "#5cb84d",
        image: "ods-15.svg",
      },
      "ODS 16 Paz, justicia e instituciones sólidas": {
        shortname: "ODS 16",
        color: "#02558b",
        image: "ods-16.svg",
      },
      "ODS 17 Alianzas para lograr los objetivos": {
        shortname: "ODS 17",
        color: "#183668",
        image: "ods-17.svg",
      },
      "no-topic": {
        shortname: "Sin relación con la Agenda2030"
      }
    },
    subtopics: {
      "1.1 Erradicar la pobreza extrema": {
        color: "#eb1c2d",
        image: "ods-01.svg",
      },
      "1.2 Niveles nacionales de pobreza": {
        color: "#eb1c2d",
        image: "ods-01.svg",
      },
    },
    defaultColor: "#cecece",
    defaultImage: "placeholder.png",
  },
}
