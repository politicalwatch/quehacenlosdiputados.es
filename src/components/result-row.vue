<template>
  <tr>
    <td class="titulo">{{ this.initiative.title }}</td>
    <td class="autor_diputado">{{ getDeputies(this.initiative) }}</td>
    <td class="autor_grupo">{{ getGroups(this.initiative) }}</td>
    <td class="capitalize-text">{{ getTopics(this.initiative) }}</td>
    <td class="actualizacion"><span :sort="this.initiative.created">{{ moment(this.initiative.created).format('DD/MM/Y') }}</span></td>
  </tr>
</template>

<script>
const moment = require('moment');

export default {
  name: 'result-row',
  props: [
    'initiative',
  ],
  data() {
    return{
      moment: moment
    }
  },
  methods: {
    getGroups(initiative) {
      return initiative.hasOwnProperty('author_parliamentarygroups') ?
        initiative.author_parliamentarygroups.join('') :
        initiative.author_others.join('');
    },
    getDeputies(initiative) {
      return initiative.hasOwnProperty('author_deputies') ?
        initiative.author_deputies.join('') :
        '';
    },
    getTopics(initiative) {
      return initiative.hasOwnProperty('topics') ?
        initiative.topics.join('') :
        '';
    }
  }
}
</script>

