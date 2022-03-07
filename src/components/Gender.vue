<template>
  <div class="c-gender">
    <div class="c-gender__icon">
      <icon :icon="gender"></icon>
    </div>
    <div class="c-gender__info">
      <div class="c-gender__info__percentage">
        {{ percentage }}%
      </div>
      <div class="c-gender__info__name">
        {{ getNameFromType(gender) }}
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon';

export default {
  name: "gender",
  props: {
    gender: {
      type: String, // female, male
      required: true,
    },
    percentage: {
      type: Number,
      required: true
    },
  },
  components: {
    Icon
  },
  methods: {
    getNameFromType: function(type) {
      if (type == 'female') return 'Mujeres'
      if (type == 'male') return 'Hombres'
      return ''
    }
  }
}
</script>

<style scoped lang="scss">
</style>
