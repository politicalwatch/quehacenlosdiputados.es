<template>
  <div style="margin-top: 60px">
    <router-link
      :to="{ name: 'footprint' }"
      target="_blank"
      style="text-decoration: none !important"
    >
      <p v-if="withLabel">
        <footprint
          v-if="withLabel"
          :footprint="70.55"
          style="display: inline-block !important"
        />&nbsp;&nbsp;¿Qué es esto?
      </p>
      <p v-else>
        Consulta aquí cómo funciona el algoritmo de huella parlamentaria
      </p>
    </router-link>
  </div>
</template>

<script setup>
import Footprint from "@/components/Footprint.vue";

const { withLabel } = defineProps({
  withLabel: {
    type: Boolean,
    default: false,
  },
});
</script>
