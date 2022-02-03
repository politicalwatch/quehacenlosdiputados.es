<template>
  <div class="o-grid">
    <div class="o-grid__col u-12 u-4@sm" v-for="item in this.items">
      <!-- <ParliamentaryGroupCard initiative="item" v&#45;if="isParliamentaryGroup()" /> -->
    </div>
  </div>
</template>

<script>

// import ParliamentaryGroupCard from '@/components/ParliamentaryGroupCard';

export default {
  name: 'CardGrid',
  components: {
    // ParliamentaryGroupCard,
  },
  props: {
    items: Array,
    type: String,
  }, 
  methods: {
    isParliamentaryGroup: function() {
      return this.type == 'parliamentarygroup'
    },
  }
}
</script>
