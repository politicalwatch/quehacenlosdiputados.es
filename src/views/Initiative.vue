<template>
  <div>
    <navbar></navbar>
    <div id="initiative">
      <page-header :title="initiative.title"></page-header>
      <div class="container page">
        <div class="row">
          <div class="col-sm-6 keyvalues">
            <text-element :meta="'Tipo de acto parlamentario'" :value="initiative.initiative_type_alt"></text-element>
            <text-element :meta="'Referencia'" :value="initiative.reference"></text-element>
            <text-element :meta="'Autor'" :value="initiative.authors"></text-element>
            <text-element :meta="'Diputada/o'" :value="initiative.deputies"></text-element>
            <text-element :meta="'Lugar'" :value="initiative.place"></text-element>
            <text-element :meta="'Registro'" :value="moment(initiative.created).format('DD/MM/Y')"></text-element>
            <text-element :meta="'Actualización'" :value="moment(initiative.updated).format('DD/MM/Y')"></text-element>
            <div class="capitalize">
              <topics-element :meta="'Temas tratados'" :topics="initiative.topics" :tags="initiative.tags"></topics-element>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="row">
              <div class="col-sm-8 col-sm-offset-2">
                <div :class="'text-center state well color-'+getColorByStatus(initiative.status)">
                  <strong>{{initiative.status}}</strong>
                </div>
                <p class="congress-link text-center">
                  <a :href="initiative.url" target="_blank" :title="'Ver '+initiative.title+' en su fuente original'">
                    <i class="fa fa-institution"></i><span>Ver en el Congreso de los Diputados</span>
                  </a>
                </p>
              </div>
            </div>
            <neuron :initiative="initiative" v-if="dataLoaded"></neuron>
          </div>
        </div>
        <div v-if="initiative.related && initiative.related.length">
          <hr>
          <div class="row">
            <div class="col-sm-12">
              <related-initiatives :meta="'Actos relacionados'" :related="initiative.related"></related-initiatives>
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
import PageHeader from '@/components/page-header'
import FooterBlock from '@/components/footer-block';
import TextElement from '@/components/text-element'
import TopicsElement from '@/components/topics-element'
import RelatedInitiatives from '@/components/related-initiatives'
import Neuron from '@/components/neuron'
import api from '@/api'

const moment = require('moment');
const color_by_status = {
  'green': ['Aprobada', 'Respondida', 'Celebrada', 'Convertida en otra', 'Acumulada en otra'],
  'black': ['En tramitación'],
  'red': ['No admitida a trámite', 'No debatida', 'Rechazada', 'Retirada']
  }


export default {
  name: 'initiative',
  components: {
    Navbar,
    PageHeader,
    FooterBlock,
    TextElement,
    TopicsElement,
    RelatedInitiatives,
    Neuron
  },
  data: function() {
    return {
      initiative: {},
      color_by_status: color_by_status,
      moment: moment,
      dataLoaded: false
    }
  },
  methods: {
    getInitiative: function() {
      api.getInitiative(this.$route.params.id)
        .then(response => {
          this.initiative = response;
          this.dataLoaded = true;
        })
        .catch(error => this.errors = error);
    },
    getColorByStatus: function(status) {
      for(let color in this.color_by_status) {
        if (this.color_by_status[color].indexOf(status) != -1) return color
      }
      return 'black'
    },
  },
  created: function() {
    this.getInitiative()
  },
  watch: {
    '$route': 'getInitiative'
  }
}
</script>

<style scoped lang="scss">
</style>
