<template>
  <router-link
    :to="{ name: 'initiative', params: { id: getId() } }"
    class="c-congress-link u-uppercase u-border-link"
    :title="getName()"
    >{{ getName() }}<icon icon="conversation"></icon
  ></router-link>
</template>

<script setup>
import Icon from "@/components/Icon.vue";

const { id, isAnswer } = defineProps({
  id: {
    type: String,
    required: true,
  },
  isAnswer: {
    type: Boolean,
    required: true,
  },
});

const getId = () => {
  return isAnswer ? id.replace("-respuesta", "") : id + "-respuesta";
};

const getName = () => {
  return isAnswer ? "Ver pregunta" : "Ver respuesta";
};
</script>
