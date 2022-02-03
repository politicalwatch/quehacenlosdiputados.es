<template>
  <div id="parliamentarygroups" class="o-container o-section u-margin-bottom-10">
    <h1>Grupos parlamentarios</h1>
    <CardGrid :items="allParliamentaryGroups" type="parliamentarygroup" layout="large" />
  </div>
</template>

<script>
import CardGrid from '@/components/CardGrid';
import { mapState } from 'vuex';

export default {
  name: 'parliamentarygroups',
  components: {
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
