<template>
  <div class="c-info-dropdown">
    <div class="c-info-dropdown__title_wrapper" @click="shown = !shown">
      <h3 class="c-info-dropdown__title">{{ title }}</h3>
      <div v-show="shown" class="c-info-dropdown__icon">
        Mostrar menos<icon icon="mdi:minus" :width="22" />
      </div>
      <div v-show="!shown" class="c-info-dropdown__icon">
        Mostrar más<icon icon="mdi:plus" :width="22" />
      </div>
    </div>
    <div class="c-info-dropdown__content" v-if="shown">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const { title } = defineProps({
  title: { type: String },
});

const shown = ref(false);
</script>

<style></style>
