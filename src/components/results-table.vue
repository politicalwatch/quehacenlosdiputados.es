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
      <result-row v-for="(initiative, index) in initiatives" :key="index" :initiative="initiative"></result-row>
    </tbody>
  </table>
</template>

<script>
import ResultRow from '@/components/result-row';

export default {
  name: 'results-table',
  props: [
    'initiatives'
  ],
  components: {
    ResultRow
  }
}
</script>
