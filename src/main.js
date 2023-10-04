import { createApp } from "vue";
import App from "./App.vue";
import { createMetaManager } from "vue-meta";
import router from "@/router";
import store from "@/store";
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
// Vue.config.productionTip = false;
app.use(router);
app.use(store);
app.use(createMetaManager());

app.directive("scroll-to", VueScrollTo);

app.mount("#app");
