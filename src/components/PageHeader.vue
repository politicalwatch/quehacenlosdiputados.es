<template>
  <header class="c-page-header" :class="{ 'c-page-header--nosub' : !subtitle }">
    <h1 class="c-page-header__title">
      {{ title }}
    </h1>
    <p class="c-page-header__subtitle" v-if="subtitle">{{ subtitle }}</p>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
  props: ['title', 'subtitle'],
};
</script>
