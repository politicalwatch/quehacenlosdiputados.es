<template>
  <div>
    <router-link :to="{name: 'footprint' }" target="_blank" style="text-decoration:none !important;">
      <p v-if="withLabel"><footprint v-if="withLabel" :footprint="184.8" style="display: inline-block !important;" />&nbsp;&nbsp;¿Qué es esto?</p>
      <p v-else>¿Cómo funciona el algoritmo de huella parlamentaria?</p>
    </router-link>
  </div>
</template>

<script>
import Footprint from '@/components/Footprint';

export default {
  name: 'FootprintInfo',
  components: {
    Footprint,
  },
  props: {
    withLabel: {
      type: Boolean,
      default: false
    },
  }
}
</script>
