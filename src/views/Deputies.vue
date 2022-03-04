<template>
  <div id="deputies" class="o-container o-section u-margin-bottom-10">
    <page-header title="Listado de diputados" />
    <deputies-form v-if="getFilteredDeputies().length" :deputies="deputies" :groups="getGroupsLongNames()" @setFilters="setFilters" :ranking="getRanking()"></deputies-form>
    <CardGrid :items="getFilteredDeputies()" type="deputy" layout="large" :extra="{footprint: getSelectedFootprint()}" />
    <not-found v-if="getFilteredDeputies().length == 0" message="No se han encontrado diputados." />
  </div>
</template>

<script>
import DeputiesForm from '@/components/DeputiesForm';
import PageHeader from '@/components/PageHeader';
import DeputyCard from '@/components/DeputyCard';
import CardGrid from '@/components/CardGrid';
import NotFound from '@/components/NotFound';
import api from '@/api'
import { mapGetters } from 'vuex';

export default {
  name: 'deputies',
  components: {
    DeputiesForm,
    PageHeader,
    DeputyCard,
    CardGrid,
    NotFound,
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
          this.deputies = response.filter(d => d.active)
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

      if ('footprint' in this.filters && this.filters['footprint'] != undefined) {
        console.log(this.filters['footprint'])
        const footprint_sort = this.getSelectedFootprint()

        return [...filteredDeputies].sort((a, b) => {
          const a_footprint = a.footprint_by_topics.filter(item => item.name == footprint_sort)[0].score
          const b_footprint = b.footprint_by_topics.filter(item => item.name == footprint_sort)[0].score
          return a_footprint < b_footprint
        })
      }
      return [...filteredDeputies].sort((a, b) => {
        return this.prepareForSorting(a.name) > this.prepareForSorting(b.name)
      })
    },
    getRanking: function() {
      const ranking = []
      const footprint = this.deputies[0].footprint_by_topics
      for (const item of footprint) {
        ranking.push(item.name)
      }

      return ranking
    },
    getSelectedFootprint: function() {
      const footprint_sort = this.filters['footprint']
      if (footprint_sort == undefined) {
        return 'General'
      }
      return footprint_sort
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
