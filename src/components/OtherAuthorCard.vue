<template>
  <div class="c-otherauthor_card">
    <div class="c-otherauthor_card__wrapper">
      <h4 class="u-uppercase">{{ name }}</h4>
    </div>
  </div>
</template>

<script setup>
const { name } = defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>
