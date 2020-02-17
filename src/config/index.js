export default {
  SHORTNAME: process.env.VUE_APP_SHORTNAME || 'p2030',
  URL: process.env.VUE_APP_URL || 'http://localhost:5000',
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
      route: 'topics',
      name: 'Temáticas',
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
      "ODS 1 - Fin de la Pobreza": {
        color: "#eb1c2d",
        image: "S_SDG-goals_icons-individual-rgb-01.png",
      },
      "ODS 2 - Hambre Cero": {
        color: "#d3a029",
        image: "S_SDG-goals_icons-individual-rgb-02.png",
      },
      "ODS 3 - Salud y bienestar": {
        color: "#4c9f38",
        image: "S_SDG-goals_icons-individual-rgb-03.png",
      },
      "ODS 4 - Educación de calidad": {
        color: "#c52333",
        image: "S_SDG-goals_icons-individual-rgb-04.png",
      },
      "ODS 5 - Igualdad de género": {
        color: "#ed4135",
        image: "S_SDG-goals_icons-individual-rgb-05.png",
      },
      "ODS 6 - Agua limpia y saneamiento": {
        color: "#00aed9",
        image: "S_SDG-goals_icons-individual-rgb-06.png",
      },
      "ODS 7 - Energía asequible y no contaminante": {
        color: "#fdb713",
        image: "S_SDG-goals_icons-individual-rgb-07.png",
      },
      "ODS 8 - Trabajo decente y crecimiento económico": {
        color: "#8f1838",
        image: "S_SDG-goals_icons-individual-rgb-08.png",
      },
      "ODS 9 - Industria, innovación e infraestructura": {
        color: "#f06a38",
        image: "S_SDG-goals_icons-individual-rgb-09.png",
      },
      "ODS 10 - Reducción de las desigualdades": {
        color: "#dd1367",
        image: "S_SDG-goals_icons-individual-rgb-10.png",
      },
      "ODS 11 - Ciudades y comunidades sostenibles": {
        color: "#f69c39",
        image: "S_SDG-goals_icons-individual-rgb-11.png",
      },
      "ODS 12 - Producción y consumo responsables": {
        color: "#cf8d2a",
        image: "S_SDG-goals_icons-individual-rgb-12.png",
      },
      "ODS 13 - Acción por el clima": {
        color: "#48773e",
        image: "S_SDG-goals_icons-individual-rgb-13.png",
      },
      "ODS 14 - Vida submarina": {
        color: "#007dbc",
        image: "S_SDG-goals_icons-individual-rgb-14.png",
      },
      "ODS 15 - Vida de ecosistemas terrestres": {
        color: "#5cb84d",
        image: "S_SDG-goals_icons-individual-rgb-15.png",
      },
      "ODS 16 - Paz, justicia e instituciones sólidas": {
        color: "#02558b",
        image: "S_SDG-goals_icons-individual-rgb-16.png",
      },
      "ODS 17 - Alianzas para lograr los objetivos": {
        color: "#183668",
        image: "S_SDG-goals_icons-individual-rgb-17.png",
      },
    },
    subtopics: {
      "1.1 Erradicar la pobreza extrema": {
        color: "#eb1c2d",
        image: "S_SDG-goals_icons-individual-rgb-01.png",
      },
      "1.2 Niveles nacionales de pobreza": {
        color: "#eb1c2d",
        image: "S_SDG-goals_icons-individual-rgb-01.png",
      },
    },
    defaultColor: "#cecece",
    defaultImage: "placeholder.png",
  },
}
