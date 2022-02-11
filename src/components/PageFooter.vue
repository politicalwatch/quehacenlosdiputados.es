<template>
  <footer class="c-footer u-padding-top-4 u-padding-bottom-2">
    <div class="o-container o-container-fluid">
      <div class="o-grid">
        <div class="o-grid__col u-3@sm c-footer__brand">
          <a href="/" class="c-footer__brand-link"><img class="c-footer__brand-logo" :src="'/img/logo-white-'+getLogoVersion()+'.png'" alt="Logo de Qué hacen las diputadas"></a>
        </div>
        <div class="o-grid__col u-6@sm u-offset-3@sm">
          <div class="o-grid">
            <div class="o-grid__col u-4@sm c-footer__section">
              <h5 class="c-footer__section-title">Proyecto</h5>
              <div class="c-footer__section-links">
                <router-link :to="{name: 'about' }" class="c-footer__menu-link">Acerca</router-link>
                <router-link :to="{name: 'topics' }" class="c-footer__menu-link">Políticas</router-link>
                <a href="https://www.parlamento2030.es/" target="_blank">Agenda 2030</a>
                <a href="https://politicalwatch.es/investigaciones/congreso-de-los-diputados" target="_blank">Investigaciones</a>
              </div>
            </div>
            <div class="o-grid__col u-4@sm c-footer__section">
              <h5 class="c-footer__section-title">Colabora</h5>
              <div class="c-footer__section-links">
                <a href="https://api.quehacenlosdiputados.es/" target="_blank">API Docs</a>
                <a href="https://github.com/politicalwatch/" target="_blank">Código fuente</a>
                <a href="https://politicalwatch.es/participa" target="_blank">Donaciones</a>
                <a href="mailto:qhld@politicalwatch.es?subject=Contacto+a+través+de+qhld.es" target="_blank">Escríbenos</a>
              </div>
            </div>
            <div class="o-grid__col u-4@sm c-footer__section">
              <h5 class="c-footer__section-title">Síguenos</h5>
              <div class="c-footer__section-icons">
                <a href="https://twitter.com/qhld_" target="_blank"><icon icon="twitter" class="c-icon--white" /></a>
                <a href="https://www.youtube.com/user/QueHacenLosDiputados" target="_blank"><icon icon="youtube" class="c-icon--white" /></a>
                <a href="#" target="_blank"><icon icon="github" class="c-icon--white" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="o-grid u-margin-top-8">
        <div class="o-grid__col u-6@sm">
          <a href="/"><img class="c-footer__brand-logo" src="/img/logo-politicalwatch.png" alt="Logo de Political Watch"></a>
        </div>
        <div class="o-grid__col u-6@sm">
          <p class="c-footer__credits">{{ (new Date()).getFullYear()  }} Political Watch - <router-link :to="{name: 'legalnotice'}" class="u-color-white">Aviso legal</router-link> - <router-link :to="{name: 'privacypolicy'}" class="u-color-white">Política de privacidad</router-link> - <router-link :to="{name: 'cookiepolicy'}" class="u-color-white">Política de cookies</router-link></p>
        </div>
      </div>
    </div>


    <cookie-law theme="base" buttonText="Entendido" buttonClass="btn btn-custom" message="Este sitio usa cookies para asegurarte la mejor experiencia web."></cookie-law>

  </footer>
</template>

<script>
  import CookieLaw from 'vue-cookie-law';
  import Icon from './Icon';

  export default {
    name: "PageFooter",
    components: {
      CookieLaw,
      Icon
    },
    methods: {
      getLogoVersion: (event) => {
        const versions = ['female', 'male', 'neutral'];
          return versions[Math.floor(Math.random()*versions.length)];
        }
      }
    }
</script>

<style scoped lang="scss">
#footer {
  img {
    width: 200px;
  }
}
</style>
