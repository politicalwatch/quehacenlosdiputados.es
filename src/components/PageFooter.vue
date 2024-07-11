<template>
  <footer class="c-footer u-padding-top-4 u-padding-bottom-2">
    <div class="o-container o-container-fluid">
      <div class="o-grid">
        <div class="o-grid__col u-3@sm c-footer__brand">
          <a href="/" class="c-footer__brand-link">
            <component
              class="c-footer__brand-logo"
              alt="Logo de Qué hacen las diputadas"
              :is="DynamicLogo"
            ></component>
          </a>
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
                  <icon icon="mdi:twitter" class="c-icon--white" />
                </a>
                <a
                  href="https://www.instagram.com/_PoliticalWatch/"
                  aria-label="Go to Instagram"
                  target="_blank"
                  ><icon icon="mdi:instagram" class="c-icon--white"
                /></a>
                <a
                  href="https://t.me/quehacenlosdiputados"
                  aria-label="Go to Telegram"
                  target="_blank"
                >
                  <icon icon="mdi:telegram" class="c-icon--white" />
                </a>
                <a
                  href="https://github.com/politicalwatch/quehacenlosdiputados.es"
                  aria-label="Go to Github"
                  target="_blank"
                >
                  <icon icon="mdi:github" class="c-icon--white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="o-grid u-margin-top-8">
        <div class="o-grid__col u-4@sm">
          <a href="https://politicalwatch.es" target="_blank">
            <LogoPW
              class="c-footer__brand-logo"
              alt="Logo de Political Watch"
            />
          </a>
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
      :debug="false"
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

<script setup>
import { defineAsyncComponent } from "vue";
import VueCookieAcceptDecline from "vue-cookie-accept-decline";
import "vue-cookie-accept-decline/dist/vue-cookie-accept-decline.css";
import { bootstrap } from "vue-gtag";
import { Icon } from "@iconify/vue";

import LogoPW from "@/assets/logo-political-watch.svg";

const getLogoVersion = () => {
  const versions = ["male", "female", "neutral"];
  return versions[Math.floor(Math.random() * versions.length)];
};

const DynamicLogo = defineAsyncComponent(
  () => import(`@/assets/logo-white-${getLogoVersion()}.svg`)
);

const cookieStatus = (val) => {
  // console.log('Cookie status: ' + val);
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
};

const cookieClickedAccept = () => {
  bootstrap().then(() => {
    gtag("consent", "update", {
      ad_storage: "granted",
      analytics_storage: "granted",
    });
  });
};

const cookieClickedDecline = () => {
  gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
  });
};
</script>

<style scoped lang="scss">
.c-footer {
  background-color: $secondary-dark;
  color: $white;

  .cookie {
    color: #1d1d1b;
  }

  img {
    width: 200px;
  }

  &__brand {
    &-link {
      display: block;
    }

    &-logo {
      display: block;
      height: auto;
      width: 200px;
      padding-bottom: rem($spacer-unit * 2);
    }
  }

  &__section {
    &-title {
      text-transform: uppercase;
    }

    &-links {
      display: flex;
      flex-direction: column;
      align-items: start;
      a {
        color: $white;
        text-decoration: none;
        line-height: 2;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    &-icons {
      a {
        display: inline;
        padding-right: rem($spacer-unit);
        color: $white;
        text-decoration: none;
        line-height: 2;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  &__menu {
    list-style: none;
  }

  &__credits {
    color: $white;
    font-size: rem(14px);
    line-height: 1.5;
    text-align: right;
  }
}
</style>
