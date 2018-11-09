<template>
  <div class="row" v-if="initiatives">
    <div class="col-sm-12">
      <h4>Últimas iniciativas</h4>
      <table id="reactive-table-1" class="table table-striped table-hover reactive-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="initiative in initiatives" v-bind:key="initiative.id">
            <td>
              <router-link :to="{path: '/initiatives/' + initiative.id}">{{initiative.title}}</router-link>
            </td>
            <td>
              <small>{{ moment(initiative.updated).format('DD/MM/Y') }}</small>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

const moment = require('moment');

export default {
  name: 'latest-initiatives',
  props: [
    'initiatives'
  ],
  data: function() {
    return {
      moment: moment
    }
  }
}
</script>
