<template>
  <div>
    <tipi-navbar :links="MENU" :disclaimerLink="DISCLAIMER" :logo="LOGO" />
    <div id="mediakit">
      <tipi-header :title="'Media Kit'"/>
      <div class="container">
        <div class="row">
          <div class="col-sm-6 language-block text-center">
              <h4>Versión en español</h4>
              <div class="download-block">
                <a href="/mediakit-es.zip" class="btn btn-custom-naked">
                  <i class="fa fa-download fa-2x"></i><br/>Descargar kit
                </a>
              </div>
              <p>
                Este kit incluye:
                <ul class="list-unstyled">
                  <li>Dossier (+ extendido)</li>
                  <li>Nota de prensa</li>
                  <li>Logos oficiales</li>
                </ul>
              </p>
          </div>
          <div class="col-sm-6 language-block text-center">
              <h4>English version</h4>
              <div class="download-block">
                <a href="/mediakit-en.zip" class="btn btn-custom-naked">
                  <i class="fa fa-download fa-2x"></i><br/>Download kit
                </a>
              </div>
              <p>
                This kit includes:
                <ul class="list-unstyled">
                  <li>Dossier (+ extended)</li>
                  <li>Official logos</li>
                </ul>
              </p>
          </div>
        </div>
      </div>
    </div>
    <footer-block></footer-block>
  </div>
</template>

<script>

import { TipiHeader, TipiNavbar } from 'tipi-frontend-uikit/src/components';
import FooterBlock from '@/components/footer-block';
import config from '@/config';

export default {
  name: 'mediakit',
  components: {
    TipiNavbar,
    TipiHeader,
    FooterBlock
  },
  data: function() {
    return {
      MENU: config.MENU,
      DISCLAIMER: config.DISCLAIMER,
      LOGO: config.LOGO,
    }
  },
}
</script>

<style scoped lang="scss">
<
