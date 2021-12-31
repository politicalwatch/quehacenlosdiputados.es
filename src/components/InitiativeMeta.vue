<template>
  <div class="c-initiative-meta">
    <div :class="`c-initiative-meta__status c-initiative-meta__status--${ getColorByStatus(initiative.status) }`">
      <strong><icon :icon="getIcon(initiative)" />{{ getStateMessage(initiative) }}</strong>
    </div>
  </div>
</template>

<script>
const moment = require('moment');
moment.locale('es');
import Icon from './Icon';

export default {
  name: 'InitiativeMeta',
  components: {
    Icon,
  },
  props: {
    initiative: Object,
    metaColors: {
      type: Object,
      default: function() {
        return {
          'completed': ['Aprobada', 'Respondida', 'Celebrada', 'Convertida en otra', 'Acumulada en otra'],
          'neutral': ['En tramitación', 'Desconocida'],
          'error': ['No admitida a trámite', 'No debatida', 'Rechazada', 'Retirada', 'Derogada', 'No celebrada'],
        };
      },
    },
  },
  methods: {
    getColorByStatus: function(status) {
      for (let color in this.metaColors) {
        if (this.metaColors[color].indexOf(status) != -1) return color;
      }
      return 'neutral';
    },
    getIcon: function(initiative) {
      const color = this.getColorByStatus(initiative['status'])
      const map = {'completed': 'success', 'neutral': 'clock', 'error': 'denied'}
      return map[color]
    },
    getStateMessage: function(initiative) {
      if (initiative['status'] == 'Desconocida') {
        return `${initiative['status']}`
      }

      const color = this.getColorByStatus(initiative['status'])
      let date = initiative['updated']
      if (color == 'neutral') {
        date = initiative['created']
      }

      const formattedDate = moment(date).fromNow()
      return `${initiative['status']} ${formattedDate}`
    },
  },
};
</script>
