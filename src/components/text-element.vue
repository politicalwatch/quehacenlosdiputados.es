<template>
  <p v-if="value">
    <span class="meta">{{meta}}</span>
    <br>
    <span class="value" v-html="show(value)"></span>
  </p>
</template>

<script>
export default {
  name: 'text-element',
  props: [
    'meta',
    'value'
  ],
  methods: {
    show: function(value) {
      if (value.constructor === Array) return value.join('<br/>')
      return value
    }
  }
}
</script>
