<template>
  <div>
    <navbar></navbar>
    <div id="alerts">
      <tipi-header :title="'Sistema de alertas'"/>
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div class="row item">
              <div class="col-xs-12">
                <div class="icon"><span>1</span></div>
                <h2>Haz una búsqueda</h2>
                <img src="/img/alerts-1.png" alt="Haz una búsqueda para empezar a usar el sistema de alertas">
              </div>
            </div>
            <div class="row item">
              <div class="col-xs-12">
                <div class="icon"><span>2</span></div>
                <h2>Haz clic en Recibe alertas</h2>
                <img src="/img/alerts-2.png" alt="Pulsa luego el botón Recibe alertas">
              </div>
            </div>
            <div class="row item">
              <div class="col-xs-12">
                <div class="icon"><span>3</span></div>
                <h2>Introduce tu correo y valídalo</h2>
                <img src="/img/alerts-3.png" alt="Por último introduce tu correo electrónico y valídalo">
              </div>
            </div>
            <hr>
            <div class="row cta">
              <div class="col-sm-6 col-sm-offset-3 col-xs-12">
                <p>Una vez dados estos tres pasos, comenzarás a recibir alertas cada vez que haya novedades en la búsqueda que has efectuado.</p>
                <router-link class="btn btn-custom btn-block" :to="{name: 'search'}">Probarlo ahora</router-link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <footer-block></footer-block>
  </div>
</template>

<script>
import Navbar from '@/components/navbar';
import { TipiHeader } from 'tipi-frontend-uikit/src/components';
import FooterBlock from '@/components/footer-block';

export default {
  name: 'alerts',
  components: {
    Navbar,
    TipiHeader,
    FooterBlock
  }
}
</script>

<style scoped lang="scss">
.item {
  padding: 40px 20px;
  .icon {
    font-size: 1.5em;
    border-radius: 50%;
    display: block;
    float: left;
    height: 35px;
    margin: 15px 10px 0 0;
    width: 35px;
    color: #f8f8f8;
    background-color: #222;
    span {
      margin: 7px 9px;
    }
  }
  h2 {
    margin-top: 20px;
    font-size: 1.5em;
    font-weight: bold;
  }
  img {
    max-width: 75%;
  }
}
@media only screen and (max-width: 980px) and (min-width: 300px) {
  .icon {
      margin: -5px 5px 0 0 !important;
  }
}
.cta {
  padding: 40px 0px;
  p {
    font-size: 1.2em;
    text-align: center;
  }
}
</style>

