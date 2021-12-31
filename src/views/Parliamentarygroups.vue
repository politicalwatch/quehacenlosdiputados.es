<template>
  <div id="parliamentarygroups" class="o-container o-section u-margin-bottom-10">
    <page-header :title="'Grupos parlamentarios'" />
      <custom-text
          :value="allParliamentaryGroups"
          type="parliamentarygroup"
          :source="allParliamentaryGroups" />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import CustomText from '@/components/CustomText';
import { mapState } from 'vuex';

export default {
  name: 'parliamentarygroups',
  components: {
    PageHeader,
    CustomText,
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
