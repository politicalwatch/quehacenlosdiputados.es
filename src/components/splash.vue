<template>
  <div id="splash" v-if="!closedSplash">
    <div class="outer">
      <div class="inner">
        <img src="/img/logo.png">
        <p><strong>Parlamento 2030</strong> te ofrece toda la información sobre la actividad del Congreso de los Diputados relacionada con los <strong>Objetivos de Desarrollo Sostenible</strong>. Entra y descubre cómo trabajan los diputados españoles de cara al cumplimiento de la <strong>Agenda 2030</strong>.</p>
        <p>Estás a punto de entrar en la versión beta de Parlamento 2030. En ella encontrarás toda la información parlamentaria sobre los cinco ODS priorizados este año en el Foro Político de Alto Nivel de Naciones Unidas. Pronto estarán disponible los 17 ODS que configuran la Agenda 2030.</p>
        <p><a class="btn btn-custom btn-block close-splash" href="#" @click="closeSplash">Comenzar</a></p>
        <p>
          <router-link :to="{name: 'about-en'}">Learn more about this project in English</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'splash',
  data: function () {
    return {
      closedMessage: false
    }
  },
  computed: {
    closedSplash: function () {
      return window.sessionStorage.getItem('closedSplash') || this.closedMessage ? true : false;
    }
  },
  methods: {
    closeSplash: function() {
      window.sessionStorage.setItem('closedSplash', true);
      this.closedMessage = true;
    }
  }
}
</script>

<style scoped lang="scss">
#splash {
  .outer {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,.5);
    text-align: center;
    z-index: 999;
    .inner {
      position: absolute;
      width: 95%;
      max-width: 800px;
      height: 95vh;
      max-height: 500px;
      top: 50%;
      left: 50%;
      margin: 0;
      transform: translate3d(-50%, -50%, 0);
      background-color: #f8f8f8;
      padding: 15px;
      @media (min-width: 768px) {
        padding: 40px;
      }
      img {
        width: 75%;
          margin-bottom: 20px;
      }
      p {
        font-size: 1em;
        margin: 15px 0;
        @media (min-width: 768px) {
          margin: 20px 0;
          font-size: 1.2em;
        }
      }
    }
  }
}
</style>
