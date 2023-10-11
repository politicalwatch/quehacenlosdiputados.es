import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createMetaManager } from "vue-meta";
import router from "@/router";
import VueGtag from "vue-gtag";
import VueScrollTo from "vue-scrollto";

import * as Sentry from "@sentry/browser";
import * as Integrations from "@sentry/integrations";

import "./styles/App.scss";

let SENTRY_DSN = import.meta.env.VUE_APP_SENTRY_DSN;
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [new Integrations.Vue({ Vue, attachProps: true })],
  });
}

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(createMetaManager());
app.use(VueGtag, {
  config: { id: import.meta.env.VITE_GA_ID },
  enabled: false,
}, router);

app.directive("scroll-to", VueScrollTo);

app.mount("#app");
