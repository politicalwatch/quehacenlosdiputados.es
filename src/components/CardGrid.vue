<template>
  <div class="o-grid c-card-grid">
    <div :class="classes" v-for="item in this.items">
      <ParliamentaryGroupCard :parliamentary_group="item" v-if="isParliamentaryGroup()" />
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
  }, 
  methods: {
    isParliamentaryGroup: function() {
      return this.type == 'parliamentarygroup'
    },
  },
  computed: {
    classes: function() {
      return "o-grid__col u-12 u-4@sm c-card-grid__item c-card-grid__item__" + this.type
    }
  }
}
</script>
