<template>
  <div>
    <div id="footer" class="o-container o-container--fluid o-section u-bg-secondary-light">
      <div class="o-grid">
        <div class="o-grid__col u-12@sm">
          <div class="o-container">
            <div class="o-grid">
              <div class="o-grid__col u-3@sm text-center">
                <a href="/"><img src="/img/logo-beta.png" class="big" alt="Logo de Parlamento 2030"></a>
                <a href="http://politicalwatch.es" target="_blank"><img src="/img/politicalwatch.png" class="small" alt="Logo de Political Watch"></a>
              </div>
              <div class="o-grid__col u-8@sm u-offset-1@sm u-text-tbody2">
                <p>
                <strong>Parlamento 2030</strong> es un proyecto de <a href="http://politicalwatch.es" target="_blank">Political Watch</a>, plataforma que se inscribe dentro del think-and-do tank <a href="http://ciecode.es" target="_blank">CIECODE</a>.
                <br/>
                Todo el código fuente está disponible en <a href="https://github.com/politicalwatch" target=_blank>Github</a> con licencia <a href="https://www.gnu.org/copyleft/gpl.html" target="_blank">GNU/GPLv3</a>.
                <br/>
                Contáctanos en <a href="mailto:parlamento2030@ciecode.es" target="_blank">parlamento2030@ciecode.es</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="c-decorator" style="background-image: url('/img/multicolor.jpg')"></div>

    <cookie-law theme="base" buttonText="Entendido" buttonClass="btn btn-custom" message="Este sitio usa cookies para asegurarte la mejor experiencia web."></cookie-law>
  </div>
</template>

<script>
  import CookieLaw from 'vue-cookie-law';

  export default {
    name: "footer-block",
    components: {CookieLaw}
  }
</script>

<style scoped lang="scss">
</style>
