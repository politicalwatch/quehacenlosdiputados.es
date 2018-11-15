<template>
  <p v-if="is(value)">
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
    },
    is: function(value) {
      if (value === undefined) return false;
      if (value.constructor === String && value != "") return true;
      if (value.constructor === Array && value.length > 0) return true;
      return false;
    }
  }
}
</script>
