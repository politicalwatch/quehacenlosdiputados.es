<template>
  <router-link :to="{name: 'initiative', params: { id: getId() }}" class="c-congress-link u-uppercase u-border-link" :title="getName()">{{ getName() }}<icon icon="conversation"></icon></router-link>
</template>

<script>
import Icon from './Icon';

export default {
  name: 'ConversationLink',
  components: {
    Icon,
  },
  props: {
    id: {
      type: String,
      required: true
    },
    isAnswer: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    getId: function() {
      if (this.isAnswer) return this.id.replace('-respuesta', '')
      return this.id + "-respuesta"
    },
    getName: function() {
      if (this.isAnswer) return "Ver pregunta"
      return "Ver respuesta"
    }
  }
}
</script>

