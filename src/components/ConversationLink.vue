<template>
  <RouterLink
    :to="{ name: 'initiative', params: { id: getId() } }"
    class="c-congress-link u-uppercase u-border-link"
    :title="getName()"
  >
    {{ getName() }} <icon icon="mdi:conversation" color="#2d4252" :width="18" />
  </RouterLink>
</template>

<script setup>
import { toRefs } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  isAnswer: {
    type: Boolean,
    required: true,
  },
});

const { id, isAnswer } = toRefs(props);

const getId = () => {
  return isAnswer.value
    ? id.value.replace("-respuesta", "")
    : id.value + "-respuesta";
};

const getName = () => {
  return isAnswer.value ? "Ver pregunta" : "Ver respuesta";
};
</script>
