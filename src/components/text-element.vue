<template>
  <p v-if="value">
    <span class="meta">{{meta}}</span>
    <br>
    <span class="value">{{show(value)}}</span>
  </p>
</template>

<script>
export default {
  name: 'text-element',
  props: ['meta', 'value'],
  methods: {
    show(value) {
      if (value.constructor === Array) return value.join('/')
      return value
    }
  }
}
</script>
