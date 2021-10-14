<template>
  <div id="parliamentarygroups" class="o-container o-section u-margin-bottom-10">
    <tipi-header :title="'Grupos parlamentarios'" />
      <tipi-text
          :value="allParliamentaryGroups"
          type="parliamentarygroup"
          :source="allParliamentaryGroups" />
  </div>
</template>

<script>
import { TipiHeader, TipiText } from 'tipi-uikit'
import { mapState } from 'vuex';

export default {
  name: 'parliamentarygroups',
  components: {
    TipiHeader,
    TipiText,
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
