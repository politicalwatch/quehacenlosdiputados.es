<template>
  <div id="parliamentarygroups" class="o-container o-section u-margin-bottom-10">
    <page-header title="Grupos parlamentarios" />
    <loader v-if="!isLoaded()" title="Cargando grupos parlamentarios" subtitle="Puede llevar algun tiempo" />
    <CardGrid :items="allParliamentaryGroups" type="parliamentarygroup" layout="medium" />
  </div>
</template>

<script>
import CardGrid from '@/components/CardGrid.vue';
import Loader from '@/components/Loader.vue';
import PageHeader from '@/components/PageHeader.vue';
import { mapState } from 'vuex';

export default {
  name: 'parliamentarygroups',
  components: {
    CardGrid,
    Loader,
    PageHeader,
  },
  computed: {
    ...mapState(['allParliamentaryGroups'])
  },
  methods: {
    isLoaded: function() {
      return this.allParliamentaryGroups && this.allParliamentaryGroups.length > 0
    }
  }
}
</script>
