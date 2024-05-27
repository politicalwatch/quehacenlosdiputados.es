<template>
  <span class="c-icon" :class="`c-icon--type-${icon}`">
    <component :is="svg" />
  </span>
</template>

<script setup>
import { toRefs, computed, defineAsyncComponent, onMounted } from "vue";

const props = defineProps({
  icon: { type: String },
  color: { type: String },
});

const { icon, color } = toRefs(props);

const svg = computed(() => {
  let svg = "";
  try {
    svg = defineAsyncComponent(
      () => import(`@/assets/svg/icon-${icon.value}.svg`)
    );
  } catch (error) {
    svg = icon.value;
  }
  return svg;
});

onMounted(() => {
  const svgPathElement = document.querySelector(".c-icon svg path");
  if (color.value && svgPathElement) {
    svgPathElement.style.fill = color.value;
  }
});
</script>
