<template>
  <div id="parliamentarygroups" class="o-container o-section u-margin-bottom-10">
    <page-header title="Grupos parlamentarios" />
    <CardGrid :items="allParliamentaryGroups" type="parliamentarygroup" layout="medium" />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import CardGrid from '@/components/CardGrid';
import { mapState } from 'vuex';

export default {
  name: 'parliamentarygroups',
  components: {
    PageHeader,
    CardGrid,
  },
  data: function() {
    return {
      groups: []
    }
  },
  computed: {
    ...mapState(['allParliamentaryGroups'])
  }
}
</script>
