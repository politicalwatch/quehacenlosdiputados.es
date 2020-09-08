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
      title: 'Buscar - TIPI Ciudadano',
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
      title: 'Resultados - TIPI Ciudadano',
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
      title: 'Iniciativa - TIPI Ciudadano',
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
    path: "/topics",
    name: "topics",
    component: Topics
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
