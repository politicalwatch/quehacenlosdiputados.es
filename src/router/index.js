import Vue from 'vue'
import VueRouter from 'vue-router'
import sha1 from 'js-sha1';
import Search from '@/views/Search.vue'
import Initiative from '@/views/Initiative.vue'
import Dashboard from '@/views/Dashboard.vue'
import Topics from '@/views/Topics.vue'
import Topic from '@/views/Topic.vue'
import Deputy from '@/views/Deputy.vue'
import Parliamentarygroup from '@/views/Parliamentarygroup.vue'
import Scanner from '@/views/Scanner.vue'
import About from '@/views/About.vue'
import AboutEnglish from '@/views/AboutEnglish.vue'
import Mediakit from '@/views/Mediakit.vue'
import Alerts from '@/views/Alerts.vue'
import Page404 from '@/views/Page404.vue'
import config from '@/config';
// eslint-disable-next-line no-unused-vars
import from from "core-js/features/array/from";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "search",
    component: Search,
    meta: {
      title: 'Buscar - Parlamento 2030',
      metaTags: [
        {
          name: 'description',
          content: 'Test Buscar'
        },
        {
          property: 'og:description',
          content: 'Test Buscar'
        },
        {
          property: 'og:title',
          content: 'Test Buscar'
        }
        , ...config.DEFAULT_METATAGS]
    }
  },
  {
    path: "/results/:data?",
    name: "results",
    component: Search,
    meta: {
      title: 'Resultados - Parlamento 2030',
      metaTags: [{
          name: 'description',
          content: 'Test Resultados'
        },
        {
          property: 'og:description',
          content: 'Test Resultados'
        }
        , ...config.DEFAULT_METATAGS
      ]
    }
  },
  {
    path: "/initiatives/:id",
    name: "initiative",
    component: Initiative,
    meta: {
      title: 'Iniciativa - Parlamento 2030',
      metaTags: [
        {
          name: 'description',
          content: 'Test Iniciativa'
        },
        {
          property: 'og:title',
          content: 'Iniciativa OG title'
        },
        {
          property: 'og:description',
          content: 'Test Iniciativa'
        }, ...config.DEFAULT_METATAGS
      ]
    }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/ods",
    name: "ods",
    component: Topics
  },
  {
    path: '/ods/1',
    redirect: {
      name: 'topic',
      params: {id: sha1('ODS 1 Fin de la pobreza')}
    }
  },
  {
    path: '/ods/2',
    redirect: {
      name: 'topic',
      params: {id: sha1("ODS 2 Hambre cero")}
    }
  },
  {
    path: '/ods/3',
    redirect: {
      name: 'topic',
      params: {id: sha1("ODS 3 Salud y bienestar")}
    }
  },
  {
    path: '/ods/4',
    redirect: {
      name: 'topic',
      params: {id: sha1("ODS 4 Educación de calidad")}
    }
  },
  {
    path: '/ods/5',
    redirect: {
      name: 'topic',
      params: {id: sha1("ODS 5 Igualdad de género")}
    }
  },
  {
    path: '/ods/6',
    redirect: {
      name: 'topic',
      params: {id: sha1("ODS 6 Agua limpia y saneamiento")}
    }
  },
  {
    path: '/ods/7',
    redirect: {
      name: 'topic',
      params: {id: sha1("ODS 7 Energía asequible y no contaminante")}
    }
  },
  {
    path: '/ods/8',
    redirect: {
      name: 'topic',
      params: {id: sha1("ODS 8 Trabajo decente y crecimiento económico")}
    }
  },
  {
    path: '/ods/9',
    redirect: {
      name: 'topic',
      params: {id: sha1("ODS 9 Industria, innovación e infraestructura")}
    }
  },
  {
    path: '/ods/10',
    redirect: {
      name: 'topic',
      params: {id: sha1("oDS 10 Reducción de las desigualdades")}
    }
  },
  {
    path: '/ods/11',
    redirect: {
      name: 'topic',
      params: {id: sha1("ODS 11 Ciudades y comunidades sostenibles")}
    }
  },
  {
    path: '/ods/12',
    redirect: {
      name: 'topic',
      params: {id: sha1("ODS 12 Producción y consumo responsables")}
    }
  },
  {
    path: '/ods/13',
    redirect: {
      name: 'topic',
      params: {id: sha1("ODS 13 Acción por el clima")}
    }
  },
  {
    path: '/ods/14',
    redirect: {
      name: 'topic',
      params: {id: sha1("ODS 14 Vida submarina")}
    }
  },
  {
    path: '/ods/15',
    redirect: {
      name: 'topic',
      params: {id: sha1("ODS 15 Vida de ecosistemas terrestres")}
    }
  },
  {
    path: '/ods/16',
    redirect: {
      name: 'topic',
      params: {id: sha1("ODS 16 Paz, justicia e instituciones sólidas")}
    }
  },
  {
    path: '/ods/17',
    redirect: {
      name: 'topic',
      params: {id: sha1("ODS 17 Alianzas para lograr los objetivos")}
    }
  },
  {
    path: "/ods/:id",
    name: "topic",
    component: Topic
  },
  {
    path: "/deputies/:id",
    name: "deputy",
    component: Deputy
  },
  {
    path: "/parliamentarygroups/:id",
    name: "parliamentarygroup",
    component: Parliamentarygroup
  },
  {
    path: "/scanner",
    name: "scanner",
    component: Scanner
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/about-en",
    name: "about-en",
    component: AboutEnglish
  },
  {
    path: "/mediakit",
    name: "mediakit",
    component: Mediakit
  },
  {
    path: "/alerts",
    name: "alerts",
    component: Alerts
  },
  {
    path: "/*",
    name: "Page404",
    component: Page404
  },
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  },
  routes: routes
});

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
  else document.title = config.DEFAULT_PAGE_TITLE;

  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  let metaTags = !nearestWithMeta ? config.DEFAULT_METATAGS : nearestWithMeta.meta.metaTags;

  if (nearestWithMeta) {
    metaTags = metaTags.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj['name']).indexOf(obj['name']) === pos || arr.map(mapObj => mapObj['property']).indexOf(obj['property']) === pos;
    });
  }

  metaTags.map(tagDef => {
      const tag = document.createElement('meta');

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });

      tag.setAttribute('data-vue-router-controlled', '');

      return tag;
    })
    .forEach(tag => document.head.appendChild(tag));

  next();
});


export default router
