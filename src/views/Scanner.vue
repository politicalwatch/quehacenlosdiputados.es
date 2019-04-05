<template>
  <div>
    <navbar></navbar>
    <page-header title="Scanner"></page-header>
    <div id="scanner">
      <div class="container page">
        <div class="row">
          <div class="col-sm-7">
            <textarea placeholder="Inserta aqui el texto que quieres escanear..." v-model="inputText">
            </textarea>
            <a class="btn btn-custom btn-block" href="#result" @click="annotate">Iniciar proceso</a>
            <div class="text-center clean-text">
              <a v-if="inputText!=''" @click="inputText=''"><i class="fa fa-times"></i> Limpiar texto</a>
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
                  <neuron :initiative="fakeInitiative" v-if="fakeInitiative"></neuron>
                </div>
                <div class="col-sm-5">
                  <p class="helptext">Aquí tienes una una relación visual de tu texto, para que de un primer vistazo veas conexiones interesantes.</p>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-7">
                  <topics-element :meta="'ODS tratados'" :topics="result.topics" :tags="result.tags"></topics-element>
                </div>
                <div class="col-sm-5">
                  <p class="helptext">Si haces clic en cualquiera de las etiquetas relacionadas con tu texto podrás conocer además toda la actividad parlamentaria asociada con dicha etiqueta.</p>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 text-center">
                  <vue-csv-downloader
                    :data="csvItems"
                    :fields="csvFields"
                    :downloadName="getNameFromCSV()"
                    id="downloadExportCSV"
                    class="btn btn-custom btn-naked">
                    <i class="fa fa-download" aria-hidden="true"></i>&nbsp;Descárgalo en CSV
                  </vue-csv-downloader>
                </div>
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
  import Navbar from '@/components/navbar'
import PageHeader from '@/components/page-header'
import FooterBlock from '@/components/footer-block'
import TopicsElement from '@/components/topics-element'
import VueCsvDownloader from 'vue-csv-downloader';
import Neuron from '@/components/neuron'
import config from '@/config'
import api from '@/api'

export default {
  name: 'tagger',
  components: {
    Navbar,
    PageHeader,
    TopicsElement,
    VueCsvDownloader,
    Neuron,
    FooterBlock
  },
  data() {
    return {
      config: config,
      inputText: '',
      result: null,
      fakeInitiative: null,
      csvItems: [],
      csvFields: ['topic', 'subtopic', 'tag']
    };
  },
  methods: {
    annotate() {
      this.fakeInitiative = null
      api.annotate(this.inputText)
        .then(response => {
          this.result = response
          this.csvItems = this.result.tags
          this.fakeInitiative = {
            'topics': this.result.topics,
            'tags': this.result.tags
          }
        }) 
        .catch(error => this.errors = error);
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
</style>
