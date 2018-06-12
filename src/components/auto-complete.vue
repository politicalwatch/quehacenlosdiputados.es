<template>
  <div class="autcomplete">
    <input class="form-control" type="text" :placeholder="placeholder" :id="id || name" :name="name" v-model="input" @input="onChange" autocomplete="off">
    <ul class="autocomplete__list" :class="id || name" v-show="isOpen">
      <li class="autocomplete__list-item" v-for="(item, i) in data" :key="i" @click="selectElement(item)">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'auto-complete',
  props: [
    'name',
    'id',
    'options',
    'placeholder'
  ],
  methods: {
    selectElement(item) {
      this.isOpen = false;
      this.input = item;
    },
    onChange() {
      this.isOpen = this.input.length > 0;
      this.data = this.items.filter(item => item.toLowerCase().indexOf(this.input.toLowerCase()) > -1);
    }
  },
  data() {
    return {
      input: '',
      isOpen: false,
      data: []
    }
  },
  computed: {
    items: function() {
      return this.options.map(op => op.value || op.name || op);
    }
  }
}
</script>


<style lang="scss">
  .autocomplete {
    position: relative;
    &__list {
      position: absolute;
      z-index: 99;
      padding: 0;
      margin: 0;
      width: 80%;
      border: 1px solid #dce4ec;
      background: #fff;
      height: 120px;
      overflow: auto;
    }
    &__list-item {
      list-style: none;
      padding: .5rem 1rem;
      border-bottom: 1px solid #dce4ec;
      cursor: pointer;
      &:hover {
        background-color: #0094cd;
        color: white;
      }
    }
  }
</style>
