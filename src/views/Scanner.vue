<template>
  <div>
    <tipi-header title="Scanner"/>
    <div id="scanner">
      <div class="container page">
        <div class="row">
          <div class="col-sm-7">
            <textarea placeholder="Inserta aqui el texto que quieres escanear..." v-model="inputText">
            </textarea>
            <a id="start" class="btn btn-custom btn-block" @click.prevent="annotate">Iniciar proceso</a>
            <div class="text-center clean-text">
              <a id="clean" :class="{ disabled: inProgress }" v-if="inputText!=''" @click="cleanTextAndResult"><i class="fa fa-times"></i> Limpiar texto <span v-if="result">y resultados</span></a>
            </div>

          </div>
          <div class="col-sm-5">
            <p class="helptext" v-html="config.SCANNER_HELPTEXT"></p>
          </div>
        </div>

        <div id="result" class="row">
          <div class="col-sm-12 result" v-if="result">
            <h2>Resultado del escáner:</h2>
            <div class="nodata-result" v-if="!result.topics.length">
              <div class="row">
                <div class="col-sm-7">
                  <div class="alert alert-dismissible alert-danger" role="alert">
                    No hemos encontrado ninguna coincidencia entre tu texto y nuestras etiquetas.
                  </div>
                </div>
              </div>
            </div>
            <div class="data-result" v-else>
              <div class="row">
                <div class="col-sm-7">
                  <tipi-neuron
                    v-if="fakeInitiative && allTopics"
                    :initiative="fakeInitiative"
                    :topics="allTopics"
                    :styles="styles"
                  />
                </div>
                <div class="col-sm-5">
                  <p class="helptext">Aquí tienes una una relación visual de tu texto, para que de un primer vistazo veas conexiones interesantes.</p>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-7">
                  <tipi-topics meta="ODS tratados" :topics="result.topics" :tags="result.tags"/>
                </div>
                <div class="col-sm-5">
                  <p class="helptext">Si haces clic en cualquiera de las etiquetas relacionadas con tu texto podrás conocer además toda la actividad parlamentaria asociada con dicha etiqueta.</p>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 text-center">
                  <tipi-csv-download
                    :initiatives="csvItems || []"
                    :csvItems="csvItems"
                    :csvFields="csvFields"
                    :canDownloadCSV="true"
                    class="btn btn-custom btn-naked"
                    label="Descárgalo en CSV"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TipiHeader, TipiTopics, TipiNeuron, TipiCsvDownload } from 'tipi-uikit'
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

<style scoped lang="scss">
a {
  cursor: pointer;
}
.clean-text {
  padding-top: 10px;
}
.helptext {
  border-left: 2px solid #3c3c3c;
  padding-left: 15px;
  text-align: justify;
}
textarea {
  width: 100%;
  height: 250px;
  font-size: 1.1em;
  border: 0px;
  padding: 10px;
}
#result {
  min-height: 500px;
  padding: 20px 0px;
}
a.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
