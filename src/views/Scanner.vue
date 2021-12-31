<template>
  <div>
    <div id="scanner" class="o-container o-section u-margin-bottom-10">
      <page-header title="Scanner"/>

        <div class="o-grid u-margin-bottom-4">
          <div class="o-grid__col u-12 u-6@sm">
            <message type="info" icon><div v-html="'Abrimos nuestra tecnología al mundo para que puedas escanear y etiquetar cualquier tipo de texto de la misma manera que TiPi Ciudadano lo hace con la actividad parlamentaria española. Ya seas periodista, estudiante o te dediques a la investigación, ponemos a tu disposición nuestra base de conocimiento, compuesta por más de 3.000 términos relacionados con las 22 temáticas a las que TiPi da seguimiento.'"></div></message>
          </div>

          <div class="o-grid__col u-12 u-6@sm">
            <p><textarea placeholder="Inserta aqui el texto que quieres escanear..." v-model="inputText" rows="9"/></p>
            <div class="c-input-label c-input-label--file u-block">
              <label for="file">Sube un archivo</label>
              <input type="file" id="file" name="file" v-on:change="loadSelectedFile" placeholder="PDF, doc o txt">
              <small class="u-color-secondary">pdf, txt, doc, docx, odt, xls, xlsx, ppt, pptx, jpg, png, gif, html</small>
            </div>
            <p>
            <a id="start" class="c-button c-button--primary" @click.prevent="annotate">Iniciar proceso</a>
            <a class="c-button" :class="{ disabled: inProgress }" v-if="hasInput" @click="cleanTextAndResult">Limpiar</a>
            </p>
          </div>
        </div>

        <div id="result" class="o-section o-grid">
          <div v-if="inProgress || errors" class="o-grid__col u-12">
            <message v-if="errors" type="error" icon>Has sobrepasado el límite de escaneos por hora. Vuelve a intentarlo pasado un tiempo</message>
            <loader v-if="inProgress" title="Escaneando resultados" :subtitle="subtitle" />
          </div>
          <div class="o-grid__col u-12 result" v-if="result">
            <h4>Resultado del escáner:</h4>
            <message v-if="!result.topics.length" type="error" icon>No hemos encontrado ninguna coincidencia entre tu texto y nuestras etiquetas.</message>
            <div class="o-grid" v-else>
              <div class="o-grid__col u-12 u-7@sm">
                <message type="info" icon>Si haces clic en cualquiera de las etiquetas relacionadas con tu texto podrás conocer además toda la actividad parlamentaria asociada con dicha etiqueta.</message >
                <topics-section meta="Temáticas tratadas" :topics="result.topics" :tags="result.tags" :topicsStyles="styles.topics"/>
              </div>
              <div class="o-grid__col u-12 u-5@sm">
                  <message type="info" icon>Aquí tienes una relación visual de tu texto, para que de un primer vistazo veas conexiones interesantes.</message>
                  <span class="u-text-tbody2">Relación de este texto con nuestras temáticas <sup title="El gráfico muestra las temáticas relacionados con el texto y el grado de relación con cada una de ellas.">?</sup></span>
              </div>
              <div class="o-grid__col u-12 u-text-center u-margin-top-4 u-padding-top-4 u-border-top">
                <csv-download
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
import PageHeader from '@/components/PageHeader';
import Message from '@/components/Message';
import Loader from '@/components/Loader';
import TopicsSection from '@/components/TopicsSection';
import CsvDownload from  '@/components/CsvDownload';
import config from '@/config';
import api from '@/api';
import { mapState } from 'vuex';

const VueScrollTo = require('vue-scrollto');

export default {
  name: 'tagger',
  components: {
    PageHeader,
    TopicsSection,
    CsvDownload,
    Message,
    Loader,
  },
  data() {
    return {
      config: config,
      inputText: '',
      inputFile: null,
      result: null,
      errors: null,
      fakeInitiative: null,
      inProgress: false,
      estimatedTime: 0,
      csvItems: [],
      csvFields: ['topic', 'subtopic', 'tag', 'times'],
      styles: config.STYLES,
    };
  },
  computed: {
    ...mapState(['allTopics']),
    subtitle () {
      return this.estimatedTime ? `Tardaremos unos ${this.estimatedTime} segundos en mostrarte resultados. No te vayas` : "Ten paciencia, estamos trabajando duro"
    },
    hasInput () {
      return this.inputText!='' || this.inputFile!=null
    }
  },
  methods: {
    cleanText() {
      this.inputText = ""
      this.inputFile = null
      document.getElementById("file").value = "";
    },
    cleanResult() {
      this.result = null
      this.errors = null
      this.fakeInitiative = null
    },
    cleanTextAndResult() {
      this.cleanText()
      this.cleanResult()
    },
    loadSelectedFile(event) {
      this.inputFile = event.target.files[0]
    },
    annotate() {
      this.cleanResult();
      this.inProgress = true;
      document.getElementById('start').text = 'Procesando...'
      this.fakeInitiative = null
      api.annotate(this.inputText, this.inputFile)
        .then(response => {
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
          } else if (response.data.status==="PROCESSING") {
            this.estimatedTime = response.data.estimated_time
            setTimeout(() => {
              this.getAsyncResults(response.data.task_id)
            }, response.data.estimated_time * 1000);
          }
        })
        .catch(error => {
          if (error.response.status == 429) this.errors = "Has sobrepasado el límite de escaneos por hora. Vuelve a intentarlo pasado un tiempo."
          else if (error.response.status == 413) this.errors = "Fichero demasiado pesado para procesarlo. Pruebe con otro más liviano."
          else this.errors = error.response.data.message
          this.inProgress = false;
          document.getElementById('start').text = 'Iniciar proceso'
        });
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
