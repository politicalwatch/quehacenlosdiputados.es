import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Search from '@/views/Search.vue'
import Initiative from '@/views/Initiative.vue'
import Topics from '@/views/Topics.vue'
import Topic from '@/views/Topic.vue'
import Deputy from '@/views/Deputy.vue'
import Deputies from '@/views/Deputies.vue'
import Parliamentarygroups from '@/views/Parliamentarygroups.vue'
import Parliamentarygroup from '@/views/Parliamentarygroup.vue'
import About from '@/views/About.vue'
import Manifest from '@/views/Manifest.vue'
import Collaborate from '@/views/Collaborate.vue'
import Footprint from '@/views/Footprint.vue'
import LegalNotice from '@/views/LegalNotice.vue'
import PrivacyPolicy from '@/views/PrivacyPolicy.vue'
import CookiePolicy from '@/views/CookiePolicy.vue'
import Page404 from '@/views/Page404.vue'
import config from '@/config';

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: 'Home - Qué hacen los diputados',
      metaTags: [
        {
          name: 'description',
          content: 'Test Home'
        },
        {
          property: 'og:description',
          content: 'Test Home'
        },
        {
          property: 'og:title',
          content: 'Test Home'
        }
        , ...config.DEFAULT_METATAGS]
    }
  },
  {
    path: "/buscar",
    name: "search",
    component: Search,
    meta: {
      title: 'Buscar - Qué hacen los diputados',
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
    path: "/resultados/:data?",
    name: "results",
    component: Search,
    meta: {
      title: 'Iniciativas - Qué hacen los diputados',
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
    path: "/iniciativas/:id",
    name: "initiative",
    component: Initiative,
    meta: {
      title: 'Iniciativa - Qué hacen los diputados',
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
    path: '/initiatives/:id',
    redirect: to => {
      return {name: 'initiative', params: { id: to.params.id }}
    }
  },
  {
    path: "/tematicas",
    name: "topics",
    component: Topics
  },
  {
    path: "/tematicas/:id",
    name: "topic",
    component: Topic
  },
  {
    path: "/diputados",
    name: "deputies",
    component: Deputies
  },
  {
    path: "/diputados/:id",
    name: "deputy",
    component: Deputy
  },
  {
    path: "/grupos",
    name: "parliamentarygroups",
    component: Parliamentarygroups
  },
  {
    path: "/grupos/:id",
    name: "parliamentarygroup",
    component: Parliamentarygroup
  },
  {
    path: "/acerca",
    name: "about",
    component: About
  },
  {
    path: "/manifiesto",
    name: "manifest",
    component: Manifest
  },
  {
    path: "/colabora",
    name: "collaborate",
    component: Collaborate
  },
  {
    path: "/huella",
    name: "footprint",
    component: Footprint
  },
  {
    path: "/aviso-legal",
    name: "legalnotice",
    component: LegalNotice
  },
  {
    path: "/politica-de-privacidad",
    name: "privacypolicy",
    component: PrivacyPolicy
  },
  {
    path: "/politica-de-cookies",
    name: "cookiepolicy",
    component: CookiePolicy
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
