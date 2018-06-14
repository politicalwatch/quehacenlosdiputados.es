<template>
  <table id="reactive-table-1" class="table table-striped table-hover reactive-table">
    <thead>
      <tr>
        <th class="col-md-6" fieldid="titulo">Titulo</th>
        <th class="col-md-2" fieldid="autor">Autor</th>
        <th class="col-md-1" fieldid="grupo">Grupo</th>
        <th class="col-md-2" fieldid="temas">Temas</th>
        <th class="sortable col-md-1" fieldid="actualizacion">
          Fecha <i class="fa fa-sort-desc"></i>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(initiative, index) in initiatives" :key="index">
        <td class="titulo">{{ initiative.title }}</td>
        <td class="autor_diputado">{{ getDeputies(initiative) }}</td>
        <td class="autor_grupo">{{ getGroups(initiative) }}</td>
        <td class="capitalize-text">-</td>
        <td class="actualizacion"><span :sort="initiative.created">{{ moment(initiative.created).format('DD/MM/Y') }}</span></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
const moment = require('moment');

export default {
  name: 'results-table',
  props: [
    'initiatives'
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
    }
  }
}
</script>
