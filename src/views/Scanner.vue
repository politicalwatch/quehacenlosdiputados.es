<template>
  <div>
    <div id="scanner" class="o-container o-section u-margin-bottom-10">
      <tipi-header title="Scanner"/>
      <div class="o-grid u-margin-bottom-4">

        <div class="o-grid__col u-12 u-6@sm" v-if="config.SCANNER_HELPTEXT">
          <tipi-message type="info" icon><div v-html="config.SCANNER_HELPTEXT"></div></tipi-message>
        </div>

        <div class="o-grid__col u-12 u-6@sm">
          <p><textarea placeholder="Inserta aqui el texto que quieres escanear..." v-model="inputText" rows="9"/></p>
          <!-- <div class="c&#45;input&#45;label c&#45;input&#45;label&#45;&#45;file u&#45;block"> -->
          <!--   <label for="file">Sube un archivo</label> -->
          <!--   <input type="file" id="file" name="file" placeholder="PDF, doc o txt"> -->
          <!-- </div> -->
          <p>
            <a id="start" class="c-button c-button--primary" @click.prevent="annotate">Iniciar proceso</a>
            <a class="c-button" :class="{ disabled: inProgress }" v-if="inputText!=''" @click="cleanTextAndResult">Limpiar texto <span v-if="result">y resultados</span></a>
          </p>
        </div>

      </div>
      <div id="result" class="o-section o-grid">
        <div v-if="inProgress || errors" class="o-grid__col u-12">
          <tipi-message v-if="errors" type="error" icon>Has sobrepasado el límite de escaneos por hora. Vuelve a intentarlo pasado un tiempo</tipi-message>
          <tipi-loader v-if="inProgress" title="Escaneando resultados" :subtitle="subtitle" />
        </div>
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
              <InitiativeBarChart :result="fakeInitiative" :styles="styles"></InitiativeBarChart>
              <span class="u-text-tbody2">Relación de este texto con los ODS <sup title="El gráfico muestra los ODS relacionados con el texto y el grado de relación con cada uno de ellos, cuya intensidad se muestra en cuánto de coloreado está cada ODS en al gráfica."><i class="fa fa-question-circle"></i></sup></span>
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
</template>

<script>
import { TipiMessage, TipiHeader, TipiLoader, TipiTopics, TipiNeuron, TipiCsvDownload } from 'tipi-uikit'
import config from '@/config';
import api from '@/api';
import { mapState } from 'vuex';
import InitiativeBarChart from '@/components/initiative-barchart.vue';

const VueScrollTo = require('vue-scrollto');

export default {
  name: 'tagger',
  components: {
    TipiHeader,
    TipiTopics,
    TipiNeuron,
    TipiCsvDownload,
    TipiMessage,
    InitiativeBarChart,
    TipiLoader,
  },
  data() {
    return {
      config: config,
      inputText: '',
      result: null,
      errors: null,
      fakeInitiative: null,
      inProgress: false,
      estimatedTime: 0,
      csvItems: [],
      csvFields: ['topic', 'subtopic', 'tag'],
      styles: config.STYLES,
    };
  },
  computed: {
    ...mapState(['allTopics']),
    subtitle () {
      return this.estimatedTime ? `Tardaremos unos ${this.estimatedTime} segundos en mostrarte resultados. No te vayas` : "Ten paciencia, estamos trabajando duro"
    }
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
          if (response.status==="SUCCESS") {
            this.result = response.result
            this.csvItems = this.result.tags
            this.fakeInitiative = {
              'topics': this.result.topics,
              'tags': this.result.tags
            }
            this.inProgress = false;
            document.getElementById('start').text = 'Iniciar proceso'
            VueScrollTo.scrollTo('#result', 1500)
          } else if (response.status==="PROCESSING") {
            this.estimatedTime = response.estimated_time
            setTimeout(() => {
              this.getAsyncResults(response.task_id)
            }, response.estimated_time * 1000);
          }
        })
        .catch(error => {
          this.errors = error.response.data.message
          this.inProgress = false;
          document.getElementById('start').text = 'Iniciar proceso'
        });
    },
    getNameFromCSV: function() {
      let d = new Date();
      return "export-scanner-" + d.toISOString() + ".csv";
    },
    getAsyncResults: function(taskID) {
      api.getScannerResult(taskID).then(response => {
        if (response.data.status==="SUCCESS") {
          this.result = response.data.result
          this.csvItems = this.result.tags
          this.fakeInitiative = {
            'topics': this.result.topics,
            'tags': this.result.tags
          }
          this.inProgress = false;
          document.getElementById('start').text = 'Iniciar proceso'
          VueScrollTo.scrollTo('#result', 1500)
        } else if (response.data.status==="PENDING") {
          setTimeout(() => {
            this.getAsyncResults(taskID)
          }, 3000);
        }
      }).catch(() => {
        setTimeout(() => {
          this.getAsyncResults(taskID)
        }, 3000);
      })
    }
  }
}
</script>
