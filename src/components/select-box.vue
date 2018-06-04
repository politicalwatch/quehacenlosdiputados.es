<template>
  <select class="form-control" :id="id || name" :name="name">
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
    'options',
    'placeholder'
  ]
}
</script>
