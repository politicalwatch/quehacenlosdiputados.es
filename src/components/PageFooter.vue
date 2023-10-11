<template>
  <footer class="c-footer u-padding-top-4 u-padding-bottom-2">
    <div class="o-container o-container-fluid">
      <div class="o-grid">
        <div class="o-grid__col u-3@sm c-footer__brand">
          <a href="/" class="c-footer__brand-link"
            ><img
              class="c-footer__brand-logo"
              :src="'/img/logo-white-' + getLogoVersion() + '.png'"
              alt="Logo de Qué hacen las diputadas"
          /></a>
        </div>
        <div class="o-grid__col u-6@sm u-offset-3@sm">
          <div class="o-grid">
            <div class="o-grid__col u-4@sm c-footer__section">
              <h5 class="c-footer__section-title">Proyecto</h5>
              <div class="c-footer__section-links">
                <router-link :to="{ name: 'about' }" class="c-footer__menu-link"
                  >Acerca</router-link
                >
                <router-link
                  :to="{ name: 'manifest' }"
                  class="c-footer__menu-link"
                  >Manifiesto</router-link
                >
                <router-link
                  :to="{ name: 'topics' }"
                  class="c-footer__menu-link"
                  >Temáticas</router-link
                >
                <router-link
                  :to="{ name: 'footprint' }"
                  class="c-footer__menu-link"
                  >Huella</router-link
                >
                <a href="https://www.parlamento2030.es/" target="_blank"
                  >Agenda 2030</a
                >
                <a
                  href="https://politicalwatch.es/investigaciones/congreso-de-los-diputados"
                  target="_blank"
                  >Investigaciones</a
                >
              </div>
            </div>
            <div class="o-grid__col u-4@sm c-footer__section">
              <h5 class="c-footer__section-title">Colabora</h5>
              <div class="c-footer__section-links">
                <a href="https://api.quehacenlosdiputados.es/" target="_blank"
                  >API Docs</a
                >
                <a href="https://github.com/politicalwatch/" target="_blank"
                  >Código fuente</a
                >
                <router-link :to="{ name: 'collaborate', hash: '#dona' }"
                  >Haz una donación</router-link
                >
                <a
                  href="mailto:qhld@politicalwatch.es?subject=Contacto+a+través+de+qhld.es"
                  target="_blank"
                  >Escríbenos</a
                >
              </div>
            </div>
            <div class="o-grid__col u-4@sm c-footer__section">
              <h5 class="c-footer__section-title">Síguenos</h5>
              <div class="c-footer__section-icons">
                <a
                  href="https://twitter.com/qhld_"
                  aria-label="Go to Twitter"
                  target="_blank"
                >
                  <icon icon="twitter" class="c-icon--white" />
                </a>
                <a
                  href="https://www.instagram.com/_PoliticalWatch/"
                  aria-label="Go to Instagram"
                  target="_blank"
                  ><icon icon="instagram" class="c-icon--white"
                /></a>
                <a
                  href="https://t.me/quehacenlosdiputados"
                  aria-label="Go to Telegram"
                  target="_blank"
                >
                  <icon icon="telegram" class="c-icon--white" />
                </a>
                <a
                  href="https://github.com/politicalwatch/quehacenlosdiputados.es"
                  aria-label="Go to Github"
                  target="_blank"
                >
                  <icon icon="github" class="c-icon--white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="o-grid u-margin-top-8">
        <div class="o-grid__col u-4@sm">
          <a href="https://politicalwatch.es" target="_blank"
            ><img
              class="c-footer__brand-logo"
              src="/img/logo-politicalwatch.png"
              alt="Logo de Political Watch"
          /></a>
        </div>
        <div class="o-grid__col u-8@sm">
          <p class="c-footer__credits">
            &copy; 2011-{{ new Date().getFullYear() }} Political Watch -
            <router-link :to="{ name: 'legalnotice' }" class="u-color-white"
              >Aviso legal</router-link
            >
            -
            <router-link :to="{ name: 'privacypolicy' }" class="u-color-white"
              >Política de privacidad</router-link
            >
            -
            <router-link :to="{ name: 'cookiepolicy' }" class="u-color-white"
              >Política de cookies</router-link
            >
          </p>
        </div>
      </div>
    </div>

    <vue-cookie-accept-decline
      :debug="true"
      :disableDecline="false"
      :showPostponeButton="false"
      @clicked-accept="cookieClickedAccept"
      @clicked-decline="cookieClickedDecline"
      @status="cookieStatus"
      elementId="cookiePanel"
      ref="cookiePanel"
      transitionName="slideFromBottom"
      type="floating"
    >
      <template #message>
        Este sitio usa cookies para asegurarte la mejor experiencia web.
      </template>

      <template #declineContent>Rechazar</template>
      <template #acceptContent>Aceptar</template>
    </vue-cookie-accept-decline>
  </footer>
</template>

<script>
import VueCookieAcceptDecline from "vue-cookie-accept-decline";
import "vue-cookie-accept-decline/dist/vue-cookie-accept-decline.css";
import { bootstrap } from "vue-gtag";
import Icon from "@/components/Icon.vue";

export default {
  name: "PageFooter",
  components: {
    VueCookieAcceptDecline,
    Icon,
  },
  methods: {
    getLogoVersion: () => {
      const versions = ["female", "male", "neutral"];
      return versions[Math.floor(Math.random() * versions.length)];
    },
    cookieStatus: (val) => {
      console.log("Cookie status: " + val);
      if (val === "decline" || val == null) {
        if (gtag) {
          gtag("consent", "default", {
            ad_storage: "denied",
            analytics_storage: "denied",
          });
        }
      } else if (val === "accept") {
        bootstrap().then(() => {
          gtag("consent", "update", {
            ad_storage: "granted",
            analytics_storage: "granted",
          });
        });
      }
    },
    cookieClickedAccept: () => {
      bootstrap().then(() => {
        gtag("consent", "update", {
          ad_storage: "granted",
          analytics_storage: "granted",
        });
      });
    },
    cookieClickedDecline: () => {
      gtag("consent", "default", {
        ad_storage: "denied",
        analytics_storage: "denied",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.c-footer .cookie {
  color: #1d1d1b;
}

#footer {
  img {
    width: 200px;
  }
}
</style>
