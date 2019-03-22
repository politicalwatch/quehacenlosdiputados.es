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
            <a class="btn btn-custom btn-block" @click="annotate">Iniciar proceso</a>
          </div>
          <div class="col-sm-5">
            <p class="helptext" v-html="config.SCANNER_HELPTEXT"></p>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12 result" v-if="result">
            <h2>Resultado del escáner:</h2>
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
import Neuron from '@/components/neuron'
import config from '@/config'
import api from '@/api'

export default {
  name: 'tagger',
  components: {
    Navbar,
    PageHeader,
    TopicsElement,
    Neuron,
    FooterBlock
  },
  data() {
    return {
      config: config,
      inputText: '',
      result: null,
      fakeInitiative: null
    };
  },
  methods: {
    annotate() {
      this.fakeInitiative = null
      api.annotate(this.inputText)
        .then(response => {
          this.result = response
          this.fakeInitiative = {
            'topics': this.result['topics'],
            'tags': this.result['tags']
          }
        }) 
        .catch(error => this.errors = error);
    }
  }
}
</script>

<style scoped lang="scss">
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
.result {
  padding: 20px 0px;
}
</style>
