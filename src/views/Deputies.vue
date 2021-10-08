<template>
  <div id="deputies" class="o-container o-section u-margin-bottom-10">
    <tipi-header :title="'Lista de diputados'" subtitle="Busca entre todos los diputados para conocer qué hacen en el congreso" />
    <tipi-text meta="Diputadas/os" :value="allDeputies" type="deputy" :source="allDeputies" />
  </div>
</template>

<script>
import { TipiHeader, TipiText } from 'tipi-uikit'
import { mapState } from 'vuex';

export default {
  name: 'deputies',
  components: {
    TipiHeader,
    TipiText
  },
  data: function() {
    return {
      deputies: []
    }
  },
  computed: {
    ...mapState(['allDeputies'])
  }
}
</script>
