<template>
  <tr>
    <td class="titulo">
      <router-link :to="{path: '/initiatives/' + this.initiative.id}">{{this.initiative.title}}</router-link>
    </td>
    <td class="autor_diputado">{{ getDeputies(this.initiative) }}</td>
    <td class="autor_grupo">{{ getAuthors(this.initiative) }}</td>
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
    getAuthors(initiative) {
      return initiative.authors.length ?
        initiative.authors.join(' / ') :
        '';
    },
    getDeputies(initiative) {
      return initiative.deputies.length ?
        initiative.deputies.join(' / ') :
        '';
    },
    getTopics(initiative) {
      return initiative.hasOwnProperty('topics') ?
        initiative.topics.join(' / ') :
        '';
    }
  }
}
</script>

