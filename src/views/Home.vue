<template>
  <div id="home" class="o-container o-section u-margin-top-4 u-margin-bottom-10">
    <h2>Estamos creando algo útil</h2>
    <div v-if="lastdays">
      <h4>Iniciativas en los últimos 7 días</h4>
      <ul>
        <li>{{ lastdays.legislative.initiatives }} legislativas ({{ lastdays.legislative.trend }})</li>
        <li>{{ lastdays.orientation.initiatives }} de orientación política ({{ lastdays.orientation.trend }})</li>
        <li>{{ lastdays.oversight.initiatives }} de control ({{ lastdays.oversight.trend }})</li>
      </ul>
    </div>
  </div>
</template>

<script>

  import api from '@/api';

  export default {
      name: 'home',
      data: function() {
          return {
              lastdays: null,
              errors: null
            }
        },
      methods: {
          getLastdays: function() {
              api.getLastdaysStats()
                .then(lastdays => this.lastdays = lastdays)
                .catch(error => this.errors = error);
            },
        },
      created: function() {
          this.getLastdays();
        }
    }
</script>
