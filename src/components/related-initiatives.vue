<template>
  <div class="related">
    <span class="meta">{{meta}}</span>
    <ul class="list-unstyled">
      <li class="value" v-for="r in related" v-bind:key="r.title">
        <small v-if="r.id">
          <router-link :to="{name: 'initiative', params: {id: r.id}}">{{r.initiative_type_alt}} ({{show(getAuthor(r))}})</router-link>
        </small>
        <small v-if="!r.id">
          <span>{{r.initiative_type_alt}} ({{show(getAuthor(r))}})</span>
        </small>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'related-initiatives',
  props: [
    'meta',
    'related'
  ],
  methods: {
    getAuthor: function(initiative) {
      if (initiative.authors) return initiative.authors;
      return initiative.deputies;
    },
    show: function(value) {
      if (value.constructor === Array) return value.join('<br/>')
      return value
    }
  }
}
</script>

<style scoped lang="scss">
</style>
