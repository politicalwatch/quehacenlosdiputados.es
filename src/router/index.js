import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import config from "@/config";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Home - Qué hacen los diputados",
      metaTags: [
        {
          name: "description",
          content: "Home - Qué hacen los diputados",
        },
        {
          property: "og:description",
          content: "Home - Qué hacen los diputados",
        },
        {
          property: "og:title",
          content: "Home - Qué hacen los diputados",
        },
        ...config.DEFAULT_METATAGS,
      ],
    },
  },
  {
    path: "/buscar",
    name: "search",
    component: () => import("@/views/Search.vue"),
    meta: {
      title: "Buscar - Qué hacen los diputados",
      metaTags: [
        {
          name: "description",
          content: "Buscar - Qué hacen los diputados",
        },
        {
          property: "og:description",
          content: "Buscar - Qué hacen los diputados",
        },
        {
          property: "og:title",
          content: "Buscar - Qué hacen los diputados",
        },
        ...config.DEFAULT_METATAGS,
      ],
    },
  },
  {
    path: "/resultados/:data?",
    name: "results",
    component: () => import("@/views/Search.vue"),
    meta: {
      title: "Iniciativas - Qué hacen los diputados",
      metaTags: [
        {
          name: "description",
          content: "Iniciativas - Qué hacen los diputados",
        },
        {
          property: "og:description",
          content: "Iniciativas - Qué hacen los diputados",
        },
        ...config.DEFAULT_METATAGS,
      ],
    },
  },
  {
    path: "/iniciativas/:id",
    name: "initiative",
    component: () => import("@/views/Initiative.vue"),
    meta: {
      title: "Iniciativa - Qué hacen los diputados",
      metaTags: [
        {
          name: "description",
          content: "Iniciativa - Qué hacen los diputados",
        },
        {
          property: "og:title",
          content: "Iniciativa - Qué hacen los diputados",
        },
        {
          property: "og:description",
          content: "Iniciativa - Qué hacen los diputados",
        },
        ...config.DEFAULT_METATAGS,
      ],
    },
  },
  {
    path: "/initiatives/:id",
    redirect: (to) => {
      return { name: "initiative", params: { id: to.params.id } };
    },
  },
  {
    path: "/tematicas",
    name: "topics",
    component: () => import("@/views/Topics.vue"),
  },
  {
    path: "/tematicas/:id",
    name: "topic",
    component: () => import("@/views/Topic.vue"),
  },
  {
    path: "/diputados",
    name: "deputies",
    component: () => import("@/views/Deputies.vue"),
  },
  {
    path: "/diputados/:id",
    name: "deputy",
    component: () => import("@/views/Deputy.vue"),
  },
  {
    path: "/grupos",
    name: "parliamentarygroups",
    component: () => import("@/views/Parliamentarygroups.vue"),
  },
  {
    path: "/grupos/:id",
    name: "parliamentarygroup",
    component: () => import("@/views/Parliamentarygroup.vue"),
  },
  {
    path: "/acerca",
    name: "about",
    component: () => import("@/views/About.vue"),
  },
  {
    path: "/manifiesto",
    name: "manifest",
    component: () => import("@/views/Manifest.vue"),
  },
  {
    path: "/colabora",
    name: "collaborate",
    component: () => import("@/views/Collaborate.vue"),
  },
  {
    path: "/huella",
    name: "footprint",
    component: () => import("@/views/Footprint.vue"),
  },
  {
    path: "/aviso-legal",
    name: "legalnotice",
    component: () => import("@/views/LegalNotice.vue"),
  },
  {
    path: "/politica-de-privacidad",
    name: "privacypolicy",
    component: () => import("@/views/PrivacyPolicy.vue"),
  },
  {
    path: "/politica-de-cookies",
    name: "cookiepolicy",
    component: () => import("@/views/CookiePolicy.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Page404",
    component: () => import("@/views/Page404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes: routes,
});

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
  else document.title = config.DEFAULT_PAGE_TITLE;

  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
    (el) => el.parentNode.removeChild(el)
  );

  let metaTags = !nearestWithMeta
    ? config.DEFAULT_METATAGS
    : nearestWithMeta.meta.metaTags;

  if (nearestWithMeta) {
    metaTags = metaTags.filter((obj, pos, arr) => {
      return (
        arr.map((mapObj) => mapObj["name"]).indexOf(obj["name"]) === pos ||
        arr.map((mapObj) => mapObj["property"]).indexOf(obj["property"]) === pos
      );
    });
  }

  metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    .forEach((tag) => document.head.appendChild(tag));

  next();
});

export default router;
