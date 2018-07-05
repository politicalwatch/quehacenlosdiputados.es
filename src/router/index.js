import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/views/Search.vue'
import Dashboard from '@/views/Dashboard.vue'
import About from '@/views/About.vue'
import AboutEnglish from '@/views/AboutEnglish.vue'
import Initiative from '@/views/Initiative.vue'

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
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
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
      path: "/initiatives/:id",
      name: "initiative",
      component: Initiative
    },
  ]
});
