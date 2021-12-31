<template>
  <div id="deputies" class="o-container o-section u-margin-bottom-10">
    <page-header :title="'Lista de diputados'" subtitle="Busca entre todos los diputados para conocer qué hacen en el congreso" />
    <deputies-form :deputies="deputies" :groups="getGroupsLongNames()" @setFilters="setFilters"></deputies-form>
    <custom-text meta="Diputadas/os" :value="getFilteredDeputies()" type="deputy" :source="deputies" />
  </div>
</template>

<script>
import DeputiesForm from '@/components/DeputiesForm';
import PageHeader from '@/components/PageHeader';
import CustomText from '@/components/CustomText';
import api from '@/api'
import { mapGetters } from 'vuex';

export default {
  name: 'deputies',
  components: {
    DeputiesForm,
    PageHeader,
    CustomText,
  },
  data: function() {
    return {
      deputies: [],
      filters: {},
    }
  },
  computed: {
    ...mapGetters({
      groups: 'allParliamentaryGroups',
    }),
  },
  methods: {
    loadDeputies: function() {
      api.getDeputies()
        .then(response => {
          this.deputies = response
        })
        .catch(error => console.log(error))
    },
    getGroupsLongNames: function() {
      return this.groups.map(group => group.name || group)
    },
    getGroupShortName: function (longname) {
      const group = this.groups.filter(group => group['name'] == longname).pop()
      return group['shortname'].toUpperCase()
    },
    setFilters: function(filters) {
      this.filters = filters
    },
    getFilteredDeputies: function() {
      let filteredDeputies = this.deputies

      if ('constituency' in this.filters && this.filters['constituency'] != null) {
        filteredDeputies = filteredDeputies.filter(deputy => deputy['constituency'] == this.filters['constituency'])
      }

      if ('group' in this.filters && this.filters['group'] != null) {
        filteredDeputies = filteredDeputies.filter(deputy => deputy['parliamentarygroup'].toUpperCase() == this.getGroupShortName(this.filters['group']))
      }

      if ('name' in this.filters && this.filters['name'] != null) {
        const regex = new RegExp('.*' + this.filters['name'] + '.*', 'i')
        filteredDeputies = filteredDeputies.filter(deputy => regex.test(deputy['name']))
      }

      return [...filteredDeputies].sort((a, b) => {
        if (!this.filters['sortUp']) {
          return this.prepareForSorting(a.name) > this.prepareForSorting(b.name)
        }
        return this.prepareForSorting(a.name) < this.prepareForSorting(b.name)
      })
    },
    prepareForSorting: function(name) {
      return name.toUpperCase()
        .replace('Á', 'A')
        .replace('É', 'E')
        .replace('Í', 'I')
        .replace('Ó', 'O')
        .replace('Ú', 'U')
        .replace('Ñ', 'NZ')
    },
  },
  beforeMount() {
    this.loadDeputies()
  }
}
</script>
