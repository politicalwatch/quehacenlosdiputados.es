<template>
  <div class="o-section c-last-activity">
    <h1 class="u-uppercase">Iniciativas en los últimos 7 días</h1>
    <h4 class="u-uppercase">Últimas iniciativas presentadas en el Congreso de los Diputados</h4>
    <div v-for="type in types" class="c-last-activity__stat">
      <icon :icon="lastdays[type].trend" />
      <h1 class="c-last-activity__number">{{ lastdays[type].initiatives }}</h1>
      <h4 class="c-last-activity__type u-uppercase">{{ titles[type] }}</h4>
      <span class="c-last-activity__description">{{ descriptions[type] }}</span>
      <a class="u-border-link u-uppercase" :href="getLink(type)">Consultar</a>
    </div>
  </div>
</template>

<script>
  import Icon from './Icon';

  export default {
    name: 'home',
    components: {
      Icon
    },
    props: {
      lastdays: Object,
    },
    data: function() {
      return {
        types: ['legislative', 'orientation', 'oversight'],
        titles: {
          legislative: 'legislativas',
          orientation: 'de orientación política',
          oversight: 'de control',
        },
        descriptions: {
          legislative: 'Sapien volutpat, vel, sit condimentum integer odio. Ut ut a tortor accumsan sagittis, nisl quam vulputate.',
          orientation: 'Cras et neque, suspendisse magna volutpat scelerisque facilisis nec.',
          oversight: 'A nulla morbi ultrices et ante est. Senectus sagittis, sit rutrum ullamcorper at auctor.',
        },
      }
    },
    methods:  {
      getLink: function(type) {
        return '/buscar'
      },
    }
  }
</script>
