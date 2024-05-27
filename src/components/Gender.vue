<template>
  <div class="c-gender u-justify-center u-justify-normal@md">
    <div class="c-gender__icon">
      <icon :icon="gender"></icon>
    </div>
    <div class="c-gender__info">
      <div class="c-gender__info__percentage">{{ percentage }}%</div>
      <div class="c-gender__info__name">
        {{ getNameFromType(gender) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";

const { gender, percentage } = defineProps({
  gender: {
    type: String, // female, male
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
});

const getNameFromType = (type) => {
  if (type == "female") return "Mujeres";
  if (type == "male") return "Hombres";
  return "";
};
</script>

<style scoped lang="scss"></style>
