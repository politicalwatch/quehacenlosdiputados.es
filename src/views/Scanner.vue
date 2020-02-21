<template>
  <div>
    <div id="scanner" class="o-container o-section">
      <tipi-header title="Scanner"/>
      <div class="o-grid">

        <div class="o-grid__col u-12 u-6@sm" v-if="config.SCANNER_HELPTEXT">
          <tipi-message type="info" icon><div v-html="config.SCANNER_HELPTEXT"></div></tipi-message>
        </div>

        <div class="o-grid__col u-12 u-6@sm">
          <p><textarea placeholder="Inserta aqui el texto que quieres escanear..." v-model="inputText" rows="9"/></p>
          <div class="c-input-label c-input-label--file u-block">
            <label for="file">Sube un archivo</label>
            <input type="file" id="file" name="file" placeholder="PDF, doc o txt">
          </div>
          <p>
            <a id="start" class="c-button c-button--primary" @click.prevent="annotate">Iniciar proceso</a>
            <a class="c-button" :class="{ disabled: inProgress }" v-if="inputText!=''" @click="cleanTextAndResult">Limpiar texto <span v-if="result">y resultados</span></a>
          </p>
        </div>

      </div>

      <div id="result" class="o-section o-grid">
        <div class="o-grid__col u-12 result" v-if="result">
            <h4>Resultado del escáner:</h4>
            <tipi-message v-if="!result.topics.length" type="error" icon>No hemos encontrado ninguna coincidencia entre tu texto y nuestras etiquetas.</tipi-message>
            <div class="o-grid" v-else>
              <div class="o-grid__col u-12 u-7@sm">
                <tipi-message type="info" icon>Si haces clic en cualquiera de las etiquetas relacionadas con tu texto podrás conocer además toda la actividad parlamentaria asociada con dicha etiqueta.</tipi-message >
                <tipi-topics meta="ODS tratados" :topics="result.topics" :tags="result.tags" :topicsStyles="styles.topics"/>
              </div>
              <div class="o-grid__col u-12 u-offset-2@sm u-3@sm">
                <tipi-message type="info" icon>Aquí tienes una una relación visual de tu texto, para que de un primer vistazo veas conexiones interesantes.</tipi-message>
                <tipi-neuron
                  v-if="fakeInitiative && allTopics"
                  :initiative="fakeInitiative"
                  :topics="allTopics"
                  :styles="styles"
                />
              </div>
              <div class="o-grid__col u-12 u-text-center u-margin-top-4 u-padding-top-4 u-border-top">
                <tipi-csv-download
                  :initiatives="csvItems || []"
                  :csvItems="csvItems"
                  :csvFields="csvFields"
                  :canDownloadCSV="true"
                  button-class="c-button--primary"
                  label="Descárgalo en CSV"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TipiMessage, TipiHeader, TipiTopics, TipiNeuron, TipiCsvDownload } from 'tipi-uikit'
import config from '@/config';
import api from '@/api';
import { mapState } from 'vuex';

const VueScrollTo = require('vue-scrollto');

export default {
  name: 'tagger',
  components: {
    TipiHeader,
    TipiTopics,
    TipiNeuron,
    TipiCsvDownload,
    TipiMessage,
  },
  data() {
    return {
      config: config,
      inputText: '',
      result: null,
      fakeInitiative: null,
      inProgress: false,
      csvItems: [],
      csvFields: ['topic', 'subtopic', 'tag'],
      styles: config.STYLES,
    };
  },
  computed: {
    ...mapState(['allTopics'])
  },
  methods: {
    cleanText() {
      this.inputText = ""
    },
    cleanResult() {
      this.fakeInitiative = null
      this.result = null
    },
    cleanTextAndResult() {
      this.cleanText()
      this.cleanResult()
    },
    annotate() {
      this.cleanResult();
      this.inProgress = true;
      document.getElementById('start').text = 'Procesando...'
      this.fakeInitiative = null
      api.annotate(this.inputText)
        .then(response => {
          this.result = response
          this.csvItems = this.result.tags
          this.fakeInitiative = {
            'topics': this.result.topics,
            'tags': this.result.tags
          }
          this.inProgress = false;
          document.getElementById('start').text = 'Iniciar proceso'
          VueScrollTo.scrollTo('#result', 1500)
        })
        .catch(error => {
          this.errors = error
          this.inProgress = false;
          document.getElementById('start').text = 'Iniciar proceso'
        });
    },
    getNameFromCSV: function() {
      let d = new Date();
      return "export-scanner-" + d.toISOString() + ".csv";
    },
  }
}
</script>
