<template>
  <div id="initiative">
    <page-header :title="initiative.title"></page-header>
    <div class="container page">
      <div class="row">
        <div class="col-sm-8 keyvalues">
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
        <div class="col-sm-4 text-center">
          <div :class="'state well color-'+getColorByStatus(initiative.status)">
            <strong>{{initiative.status}}</strong>
          </div>
          <div class="well">
            <p class="text-center congress-link">
              <a :href="initiative.url" target="_blank" :title="'Ver '+initiative.title+' en su fuente original'">
                <i class="fa fa-institution fa-2x"></i><br/>Consulta en la web del Congreso toda la informacióobre su tramitación Parlamentaria
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/page-header'
import TextElement from '@/components/text-element'
import TopicsElement from '@/components/topics-element'
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
    PageHeader,
    TextElement,
    TopicsElement
  },
  data: function() {
    return {
      initiative: null,
      color_by_status: color_by_status,
      moment: moment
    }
  },
  methods: {
    getInitiative: function() {
      api.getInitiative(this.$route.params.id)
        .then(response => this.initiative = response)
        .catch(error => this.errors = error);
      console.log(this.initiative)
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
  }
}
</script>

<style scoped lang="scss">
</style>
