import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/views/Search.vue'
import Initiative from '@/views/Initiative.vue'
import Dashboard from '@/views/Dashboard.vue'
import Topics from '@/views/Topics.vue'
import Topic from '@/views/Topic.vue'
import Deputy from '@/views/Deputy.vue'
import Parliamentarygroup from '@/views/Parliamentarygroup.vue'
import About from '@/views/About.vue'
import AboutEnglish from '@/views/AboutEnglish.vue'
import Mediakit from '@/views/Mediakit.vue'
import Alerts from '@/views/Alerts.vue'
import Page404 from '@/views/Page404.vue'

Vue.use(Router)

export default new Router({
  mode: "history",
  scrollBehavior () {
    return { x: 0, y: 0  }
  },
  routes: [
    {
      path: "/",
      name: "search",
      component: Search
    },
    {
      path: "/results/:data?",
      name: "results",
      component: Search
    },
    {
      path: "/initiatives/:id",
      name: "initiative",
      component: Initiative
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
      path: "/topics/:id",
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
  ]
});
