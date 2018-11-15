<template>
  <p v-if="is(value)">
    <span class="meta">{{meta}}</span>
    <br>
    <span v-for="v in value" v-bind:key="v" class="value" style="display:block;">
      <router-link :to="{path: '/'+type+'/' + getPeopleFromName(v).id}" v-if="getPeopleFromName(v)">
        <span v-if="getPeopleFromName(v).image" class="foto mediana"><img :src="getPeopleFromName(v).image" /></span>
        {{v}}
      </router-link>
      <span v-else>{{v}}</span>
    </span>
  </p>
</template>

<script>
import api from '@/api'

export default {
  name: 'people-element',
  props: [
    'meta',
    'value',
    'type',
    'source'
  ],
  data: function() {
    return {
      endpoints: {
        'deputies': api.getDeputies,
        'parliamentarygroups': api.getGroups
      }
    }
  },
  methods: {
    getPeopleFromName: function (name) {
      return this.source.find(s => s.name == name);
    },
    is: function(value) {
      if (value === undefined) return false;
      if (value.constructor === Array && value.length > 0) return true;
      return false;
    }
  }
}
</script>
