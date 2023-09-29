import Vue from "vue";
import App from "./App.vue";
import VueMeta from "vue-meta";
import router from "@/router";
import store from "@/store";

import * as Sentry from "@sentry/browser";
import * as Integrations from "@sentry/integrations";

import "./styles/App.scss";

import "./registerServiceWorker";

let SENTRY_DSN = import.meta.env.VUE_APP_SENTRY_DSN;
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [new Integrations.Vue({ Vue, attachProps: true })],
  });
}

Vue.config.productionTip = false;
Vue.use(VueMeta);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
