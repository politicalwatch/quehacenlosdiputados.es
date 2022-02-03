<template>
  <div :class="'c-deputy-card ' + layout + '-layout'">
    <div class="c-deputy-card__wrapper">

      <!-- <router&#45;link :to="{name: 'deputy', params: {id: deputy.id }}"> -->
        <img :src="deputy.image" :title="deputy.name" :class="'c-deputy-card__wrapper__image c-deputy-card__wrapper__image-'+layout" />

        <div v-if="layout != 'small'" class="c-deputy-card__wrapper__info">
          <h4>{{deputy.name}}</h4>
          <p>{{ deputy.parliamentarygroup }}</p>
          <h5 v-if="layout == 'large'"><icon icon="location"/>{{ deputy.constituency }}</h5>
        </div>

      <!-- </router&#45;link> -->

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Icon from './Icon';

export default {
  name: 'DeputyCard',
  components: {
    Icon,
  },
  props: {
    deputy: {
      type: Object,
      required: true
    },
    layout: {
      type: String,
      default: 'mdium' // small, medium, large
    },
  },
  computed: {
    ...mapGetters({
      getDeputyByName: 'getDeputyByName',
    }),
  },
}
</script>
