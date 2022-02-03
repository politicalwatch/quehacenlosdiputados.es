<template>
  <div class="o-grid c-card_grid">
    <div :class="classes" v-for="item in this.items">
      <ParliamentaryGroupCard :parliamentary_group="item" v-if="isParliamentaryGroup()" :layout="layout"/>
    </div>
  </div>
</template>

<script>

import ParliamentaryGroupCard from '@/components/ParliamentaryGroupCard';

export default {
  name: 'CardGrid',
  components: {
    ParliamentaryGroupCard,
  },
  props: {
    items: Array,
    type: String,
    layout: String,
  }, 
  methods: {
    isParliamentaryGroup: function() {
      return this.type == 'parliamentarygroup'
    },
  },
  computed: {
    classes: function() {
      return "o-grid__col u-12 u-4@sm c-card_grid__item c-card_grid__item__" + this.type + " c-card_grid__" + this.layout
    }
  }
}
</script>
