<template>
  <div class="o-grid c-card_grid">
    <div :class="classes" v-for="item in this.items">
      <ParliamentaryGroupCard :parliamentary_group="item" v-if="isParliamentaryGroup()" :layout="layout"/>
      <deputy-card v-if="isDeputy()" :deputy="item" :layout="layout" :footprint="getDeputyExtra()"/>
    </div>
  </div>
</template>

<script>

import ParliamentaryGroupCard from '@/components/ParliamentaryGroupCard';
import DeputyCard from '@/components/DeputyCard';

export default {
  name: 'CardGrid',
  components: {
    ParliamentaryGroupCard,
    DeputyCard,
  },
  props: {
    items: Array,
    type: String,
    layout: String,
    extra: Object,
  }, 
  methods: {
    isDeputy: function() {
      return this.type == 'deputy'
    },
    isParliamentaryGroup: function() {
      return this.type == 'parliamentarygroup'
    },
    getDeputyExtra: function() {
      if ('footprint' in this.extra) {
        return this.extra['footprint']
      }
      return 'General'
    }
  },
  computed: {
    classes: function() {
      return "o-grid__col u-12 u-4@sm c-card_grid__item c-card_grid__item__" + this.type + " c-card_grid__" + this.layout
    }
  }
}
</script>
