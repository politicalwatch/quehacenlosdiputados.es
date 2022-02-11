<template>
  <header class="c-page-header" :class="{ 'c-page-header--nosub' : !subtitle }">
    <h1 class="c-page-header__title u-uppercase">{{ title }}</h1>
    <h4 class="u-uppercase" v-if="subtitle">{{ subtitle }}</h4>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
  props: ['title', 'subtitle'],
};
</script>
