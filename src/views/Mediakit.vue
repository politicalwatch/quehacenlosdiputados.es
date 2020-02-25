<template>
  <div>
    <div id="mediakit" class="o-container o-section u-margin-bottom-10">
      <tipi-header title="Media Kit"/>
      <div class="o-grid o-grid--center">
        <div class="o-grid__col u-12 u-4@sm u-bg-secondary-light u-margin-right-2@sm">
          <div class="u-padding-4">
            <h4 class="u-text-center">Versión en español</h4>
            <p class="u-text-center">
              <a href="/mediakit-es.zip" class="c-button c-button--primary">Descargar kit</a>
            </p>
            <p class="u-margin-top-4">
              Este kit incluye:
            </p>
            <ul>
              <li>Dossier (+ extendido)</li>
              <li>Nota de prensa</li>
              <li>Logos oficiales</li>
            </ul>
          </div>
        </div>
        <div class="o-grid__col u-12 u-4@sm u-bg-secondary-light u-margin-left-2@sm">
          <div class="u-padding-4">
            <h4 class="u-text-center">English version</h4>
            <p class="u-text-center">
              <a href="/mediakit-en.zip" class="c-button c-button--primary">Download kit</a>
            </p>
            <p class="u-margin-top-4">
              This kit includes:
            </p>
            <ul>
              <li>Dossier (+ extended)</li>
              <li>Official logos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TipiHeader } from 'tipi-uikit';

export default {
  name: 'mediakit',
  components: {
    TipiHeader,
  },
}
</script>
