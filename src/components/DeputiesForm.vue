<template>
  <form id="deputies-form" class="u-margin-bottom-4 u-border-bottom" role="form" @submit.prevent="preventSubmission($event)">
    <div class="o-grid">
      <div class="o-grid__col u-12 u-padding-bottom-4">
        <div class="c-input-label u-block">
          <label for="name">Nombre</label>
          <input v-model="form.name" type="text" id="name" name="name" @input="emitFilters()" placeholder="Nota: Se admiten expresiones regulares">
        </div>
      </div>
    </div>
    <div class="o-grid">
      <div class="o-grid__col u-12 u-6@sm u-padding-bottom-4">
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
            name="group" id="group" placeholder="Todos">
          </multiselect>
        </div>
      </div>
      <div class="o-grid__col u-12 u-6@sm u-padding-bottom-4">
        <div class="c-select-label u-block">
          <label for="constituency">Circunscripción</label>
          <multiselect
            selectedLabel="Seleccionado"
            selectLabel=""
            deselectLabel="Pulsa para deseleccionar"
            v-model="form.constituency"
            :options="getConstituencies()"
            :allow-empty="true"
            @input="emitFilters()"
            name="constituency" id="constituency" placeholder="Todos">
          </multiselect>
        </div>
      </div>
    </div>
    <div class="o-grid">
      <div class="o-grid__col u-4 u-6@sm u-padding-bottom-4">
        <button class="c-button u-padding-left-0 u-margin-right-2" @click.prevent="cleanForm">Limpiar búsqueda</button>
      </div>
      <div class="o-grid__col u-8 u-6@sm u-padding-bottom-4 u-text-right@sm">
        <button class="c-button u-padding-right-0" @click.prevent="changeOrder">Ordenar alfabéticamente</button>
      </div>
    </div>
  </form>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  name: 'DeputiesForm',
  components: {
    Multiselect,
  },
  data: function() {
    return {
      form: {
        sortUp: true,
      },
    }
  },
  props: {
    deputies: Array,
    groups: Array,
  },
  methods: {
    cleanForm: function() {
      this.form.group = null
      this.form.constituency = null
      this.form.name = ''
      this.form.sortUp = true

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
    changeOrder: function() {
      this.form.sortUp = !this.form.sortUp
      this.emitFilters()
    },
  }
}
</script>
