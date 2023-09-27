<template>
  <form id="deputies-form" class="u-margin-bottom-8" role="form" @submit.prevent="preventSubmission($event)">
    <div class="o-grid">
      <div class="o-grid__col u-12 u-4@sm">
        <div class="c-input-label u-block">
          <label for="name">Nombre</label>
          <input v-model="form.name" type="text" name="name" id="name" @input="emitFilters()" placeholder="Busca por nombre y apellidos">
        </div>
      </div>
      <div class="o-grid__col u-12 u-4@sm">
        <div class="c-select-label u-block">
          <label for="group">Grupo</label>
          <multiselect
            selectedLabel="Seleccionado"
            selectLabel=""
            deselectLabel="Pulsa para deseleccionar"
            v-model="form.group"
            :options="groups"
            :allow-empty="true"
            @input="emitFilters()"
            name="group" id="group" placeholder="Selecciona uno">
          </multiselect>
        </div>
      </div>
      <div class="o-grid__col u-12 u-4@sm">
        <div class="c-select-label u-block">
          <label for="constituency">Provincia</label>
          <multiselect
            selectedLabel="Seleccionado"
            selectLabel=""
            deselectLabel="Pulsa para deseleccionar"
            v-model="form.constituency"
            :options="getConstituencies()"
            :allow-empty="true"
            @input="emitFilters()"
            name="constituency" id="constituency" placeholder="Selecciona una">
          </multiselect>
        </div>
      </div>
    </div>
    <div class="o-grid u-margin-top-1">
      <div class="o-grid__col u-12 u-6@sm">
        <div class="c-select-label u-block">
          <label for="footprint">Ordenar por huella de</label>
          <multiselect
            selectedLabel="Seleccionado"
            selectLabel=""
            deselectLabel="Pulsa para deseleccionar"
            v-model="form.footprint"
            :options="ranking"
            :allow-empty="true"
            @input="emitFilters()"
            name="footprint" id="footprint" placeholder="Selecciona una">
          </multiselect>
        </div>
      </div>
      <div class="o-grid__col u-12 u-6@sm">
        <footprint-info :withLabel="true" />
      </div>
    </div>
    <div class="o-grid">
      <div class="o-grid__col u-8 u-12@sm u-text-right@sm">
        <button class="c-button u-padding-right-0" @click.prevent="cleanForm">Limpiar búsqueda</button>
      </div>
    </div>
  </form>
</template>

<script>
import Multiselect from 'vue-multiselect'
import FootprintInfo from '@/components/FootprintInfo.vue'

export default {
  name: 'DeputiesForm',
  components: {
    Multiselect,
    FootprintInfo,
  },
  data: function() {
    return {
      form: {},
    }
  },
  props: {
    deputies: Array,
    groups: Array,
    ranking: Array,
  },
  methods: {
    cleanForm: function() {
      this.form.group = null
      this.form.constituency = null
      this.form.name = ''
      this.emitFilters()
    },
    emitFilters: function() {
      this.$emit('setFilters', this.form);
    },
    getConstituencies: function() {
      const constituencies = {}
      for (const deputy of this.deputies) {
        constituencies[deputy['constituency']] = deputy['constituency']
      }
      return Object.keys(constituencies).sort(Intl.Collator().compare);
    },
    preventSubmission: function(e) {
      e.preventDefault()
    },
    getRanking: function() {
      const ranking = {}
      for (const option of this.ranking) {
        ranking[option] = option
      }
      return ranking
    },
  }
}
</script>
