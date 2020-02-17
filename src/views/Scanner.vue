<template>
  <div>
    <div id="scanner" class="o-container o-section">
      <tipi-header title="Scanner"/>
      <div class="o-grid">
        <div class="o-grid__col u-12 u-7@sm">
          <textarea placeholder="Inserta aqui el texto que quieres escanear..." v-model="inputText" />
          <p>
            <a id="start" class="c-button c-button--primary" @click.prevent="annotate">Iniciar proceso</a>
            <a class="c-button" :class="{ disabled: inProgress }" v-if="inputText!=''" @click="cleanTextAndResult">Limpiar texto <span v-if="result">y resultados</span></a>
          </p>

        </div>
        <div class="o-grid__col u-12 u-5@sm">
          <p class="helptext" v-html="config.SCANNER_HELPTEXT"></p>
        </div>
      </div>

      <div id="result" class="o-section o-grid">
        <div class="o-grid__col u-12 result" v-if="result">
          <h3>Resultado del escáner:</h3>
            <tipi-message v-if="!result.topics.length" type="error" icon>No hemos encontrado ninguna coincidencia entre tu texto y nuestras etiquetas.</tipi-message>
            <div class="o-grid" v-else>
              <div class="o-grid__col u-12 u-7@sm">
                <tipi-neuron
                  v-if="fakeInitiative && allTopics"
                  :initiative="fakeInitiative"
                  :topics="allTopics"
                  :styles="styles"
                />
              </div>
              <div class="o-grid__col u-12 u-5@sm">
                <p>Aquí tienes una una relación visual de tu texto, para que de un primer vistazo veas conexiones interesantes.</p>
              </div>
              <div class="o-grid__col u-12 u-7@sm">
                <tipi-topics meta="ODS tratados" :topics="result.topics" :tags="result.tags"/>
              </div>
              <div class="o-grid__col u-12 u-5@sm">
                <p>Si haces clic en cualquiera de las etiquetas relacionadas con tu texto podrás conocer además toda la actividad parlamentaria asociada con dicha etiqueta.</p>
              </div>
              <div class="o-grid__col u-12 u-text-center u-padding-top-4">
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
