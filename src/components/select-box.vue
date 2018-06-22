<template>
  <select v-model="initialValue" class="form-control" :id="id || name" :name="name">
    <option value="" v-if="placeholder">{{ placeholder }}</option>
    <option v-for="(option, index) in options" :key="index" :value="option.value || option.name || option" v-text="option.name || option"></option>
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
  data: function() {
    return {
      currentValue: this.value
    }
  },
  computed: {
    initialValue: {
      get: function() {
        return this.currentValue
      },
      set: function(newValue) {
        this.currentValue = newValue;
        this.$emit('input', newValue);
        this.$emit('change', newValue);
      }
    }
  }
}
</script>
