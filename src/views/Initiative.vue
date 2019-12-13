<template>
  <div>
    <tipi-navbar :links="MENU" :disclaimerLink="DISCLAIMER" :logo="LOGO" />
    <div id="initiative">
      <tipi-header :title="initiative.title"/>
      <div class="container page">
        <div class="row">
          <div class="col-sm-6 keyvalues">
            <text-element :meta="'Tipo de acto parlamentario'" :value="initiative.initiative_type_alt"></text-element>
            <text-element :meta="'Referencia'" :value="initiative.reference"></text-element>
            <people-element :meta="'Autor'" :value="initiative.authors" :type="'parliamentarygroups'" :source="allParliamentarygroups"></people-element>
            <people-element :meta="'Diputada/o'" :value="initiative.deputies" :type="'deputies'" :source="allDeputies"></people-element>
            <text-element :meta="'Lugar'" :value="initiative.place"></text-element>
            <text-element :meta="'Registro'" :value="moment(initiative.created).format('DD/MM/Y')"></text-element>
            <text-element :meta="'Actualización'" :value="moment(initiative.updated).format('DD/MM/Y')"></text-element>
            <topics-element :meta="'ODS tratados'" :topics="initiative.topics" :tags="initiative.tags"></topics-element>
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
            <div class="row">
              <div class="col-sm-12 text-center neuron-block">
                <span>Relación de esta iniciativa con los ODS <sup title="El gráfico muestra los ODS relacionados con la iniciativa y el grado de relación con cada uno de ellos, cuya intensidad se refleja en la barra circular que los rodea."><i class="fa fa-question-circle"></i></sup></span>
                <neuron :initiative="initiative"  v-if="dataLoaded"></neuron>
              </div>
            </div>
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

import { TipiHeader, TipiNavbar } from 'tipi-frontend-uikit/src/components'
import FooterBlock from '@/components/footer-block';
import TextElement from '@/components/text-element'
import PeopleElement from '@/components/people-element'
import TopicsElement from '@/components/topics-element'
import RelatedInitiatives from '@/components/related-initiatives'
import Neuron from '@/components/neuron'
import api from '@/api';
import config from '@/config';

const moment = require('moment');
const color_by_status = {
  'green': ['Aprobada', 'Respondida', 'Celebrada', 'Convertida en otra', 'Acumulada en otra'],
  'black': ['En tramitación', 'Desconocida'],
  'red': ['No admitida a trámite', 'No debatida', 'Rechazada', 'Retirada', 'Derogada', 'No celebrada']
  }


export default {
  name: 'initiative',
  components: {
    TipiNavbar,
    TipiHeader,
    FooterBlock,
    TextElement,
    PeopleElement,
    TopicsElement,
    RelatedInitiatives,
    Neuron
  },
  data: function() {
    return {
      initiative: {},
      allDeputies: null,
      allParliamentarygroups: null,
      color_by_status: color_by_status,
      moment: moment,
      dataLoaded: false,
      MENU: config.MENU,
      DISCLAIMER: config.DISCLAIMER,
      LOGO: config.LOGO,
    }
  },
  methods: {
    getDeputies: function() {
      api.getDeputies()
        .then(response => {
          this.allDeputies = response;
          this.getParliamentarygroups();
        })
        .catch(error => this.errors = error);
    },
    getParliamentarygroups: function() {
      api.getGroups()
        .then(response => {
          this.allParliamentarygroups = response;
          this.getInitiative();
        })
        .catch(error => this.errors = error);
    },
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
    this.getDeputies()
  },
  watch: {
    '$route': 'getInitiative'
  }
}
</script>

<style scoped lang="scss">
.neuron-block {
  margin-top: 60px;
    span {
      text-transform: uppercase;
      border-bottom: 5px solid #efefef;
      padding-bottom: 10px;
      font-weight: bold;
    }
}
</style>
