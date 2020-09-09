<template>
  <div>
    <div id="footer" class="o-container o-container--fluid o-section u-bg-secondary-dark">

      <div class="o-container">
        <div class="o-grid">
          <div class="o-grid__col u-3@sm u-margin-top-4">
            <a href="/"><img src="/img/logo_big.svg" class="big" alt="Logo de TIPI Ciudadano"></a>
          </div>
          <div class="o-grid__col u-3@sm u-offset-1@sm u-margin-top-4">
            <p class="u-text-overline u-color-white">Impulsado por</p>
            <a href="http://ciecode.es" target="_blank"><img src="/img/logo-ciecode-alt.png" class="big" alt="Logo de Political Watch"></a>
          </div>
          <div class="o-grid__col u-4@sm u-offset-1 u-margin-top-4">
            <p class="u-text-overline u-color-white">Contacto</p>
            <tipi-icon icon="github" class="c-icon--white" />&nbsp;<a class="u-color-white u-text-tbody2" href="http://github.com/politicalwatch/" title="github.com/politicalwatch" target="_blank">Consulta nuestro código en Github</a>
            <br>
            <tipi-icon icon="mail" class="c-icon--white" />&nbsp;<a class="u-color-white u-text-tbody2" href="mailto:tipi@ciecode.es" title="tipi@ciecode.es" target="_blank">Escribe a tipi@ciecode.es</a>
          </div>
        </div>
        <div class="o-grid">
          <div class="o-grid__col u-12@sm u-margin-top-4">
            <p class="u-color-white u-text-tbody2">{{ (new Date()).getFullYear()  }} Political Watch. Algunos derechos reservados.</p>
          </div>
        </div>
      </div>

    </div>

    <cookie-law theme="base" buttonText="Entendido" buttonClass="btn btn-custom" message="Este sitio usa cookies para asegurarte la mejor experiencia web."></cookie-law>

  </div>
</template>

<script>
  import CookieLaw from 'vue-cookie-law';
  import { TipiIcon } from 'tipi-uikit';

  export default {
    name: "footer-block",
    components: {
      CookieLaw,
      TipiIcon
    }
  }
</script>

<style scoped lang="scss">
img.big {
  width: 100%;
}
</style>
