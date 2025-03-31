import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createHead } from "@unhead/vue/client";
import router from "@/router";
import { createGtag } from "vue-gtag";
import VueScrollTo from "vue-scrollto";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(createHead());

const gtag = createGtag({
  tagId: import.meta.env.VITE_GA_ID,
  pageTracker: {
    router,
  },
  initMode: "manual",
});
app.use(gtag);

app.directive("scroll-to", VueScrollTo);

app.mount("#app");
