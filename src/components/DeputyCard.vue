<template>
  <div :class="'c-deputy-card ' + layout + '-layout'">
    <div class="c-deputy-card__wrapper">

      <router-link :to="{name: 'deputy', params: {id: deputy.id }}" style="position:relative;">
        <img :src="deputy.image" :title="deputy.name" :class="'c-deputy-card__wrapper__image c-deputy-card__wrapper__image-'+layout" />
        <party-logo-icon :party="deputy.party_name" v-if="layout == 'large'" style="position:absolute;bottom:0;left:6rem;" />
      </router-link>

      <div v-if="layout != 'small'" class="c-deputy-card__wrapper__info">
        <footprint footprint="358,7" />
        <router-link :to="{name: 'deputy', params: {id: deputy.id }}">
          <h4 v-html="getSeparatedName()"></h4>
        </router-link>
        <p>{{ deputy.parliamentarygroup }}</p>
        <h5 v-if="layout == 'large'"><icon icon="location"/>{{ deputy.constituency }}</h5>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Footprint from '@/components/Footprint';
import PartyLogoIcon from '@/components/PartyLogoIcon';
import Icon from './Icon';

export default {
  name: 'DeputyCard',
  components: {
    Footprint,
    PartyLogoIcon,
    Icon,
  },
  props: {
    deputy: {
      type: Object,
      required: true
    },
    layout: {
      type: String,
      default: 'medium' // small, medium, large
    },
  },
  computed: {
    ...mapGetters({
      getDeputyByName: 'getDeputyByName',
    }),
  },
  methods: {
    getSeparatedName: function() {
      return this.deputy.name.split(',').join(',<br/>');
    }
  }
}
</script>
