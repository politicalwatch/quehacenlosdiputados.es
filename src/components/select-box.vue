<template>
  <select v-model="initialValue" class="form-control" :id="id || name" :name="name">
    <option value="" v-if="placeholder">{{ placeholder }}</option>
    <option v-for="option in options" :key="option.name || option" :value="option.value || option.name || option" v-text="option.name || option"></option>
  </select>
</template>

<script>
export default {
  name: 'select-box',
  props: [
    'name',
    'id',
    'value',
    'options',
    'placeholder'
  ],
  data() {
    return {
      currentValue: this.value
    }
  },
  computed: {
    initialValue: {
      get() { return this.currentValue },
      set(newValue) {
        this.currentValue = newValue;
        this.$emit('input', newValue);
      }
    }
  }
}
</script>
