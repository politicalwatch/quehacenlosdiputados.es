<template>
  <div class="autocomplete">
    <input class="form-control" type="text"
      :placeholder="placeholder"
      :id="id || name" :name="name"
      v-model="input"
      @input="onChange()"
      autocomplete="off"
      @keydown.down="onArrowDown()"
      @keydown.up="onArrowUp()"
      @keydown.enter.prevent="onEnter()"
      @keydown.tab="onEnter()">

    <ul class="autocomplete__list" :class="id || name" v-show="isOpen">
      <li
        class="autocomplete__list-item"
        :class="{ 'active': index === arrowIndex }"
        v-for="(item, index) in data"
        :key="index"
        @click="selectElement(item)"
        @mouseover="arrowIndex = index">
          {{ item }}
      </li>
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
  data: function() {
    return {
      input: '',
      isOpen: false,
      arrowIndex: -1,
      data: []
    }
  },
  methods: {
    selectElement: function(item) {
      this.isOpen = false;
      this.input = item;
      this.$emit('input', this.input);
    },
    onChange: function() {
      this.isOpen = this.input.length > 0;
      this.data = this.items.filter(item => item.toLowerCase().indexOf(this.input.toLowerCase()) > -1);
    },
    onArrowDown: function() {
      if (this.arrowIndex < this.data.length) {
        this.arrowIndex = this.arrowIndex + 1;
        this.scrollToItem();
      }
    },
    onArrowUp: function() {
      if (this.arrowIndex > 0) {
        this.arrowIndex = this.arrowIndex - 1;
        this.scrollToItem();
      }
    },
    scrollToItem: function() {
      const element = this.$el.getElementsByClassName('autocomplete__list-item')[this.arrowIndex];
      if (element) {
        element.scrollIntoView(false);
      }
    },
    onEnter: function() {
      if (this.isOpen && this.arrowIndex >= 0) {
        this.input = this.data[this.arrowIndex];
        this.isOpen = false;
        this.arrowIndex = -1;
      }
    },
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
      max-height: 220px;
      overflow: auto;
    }
    &__list-item {
      list-style: none;
      padding: .5rem 1rem;
      border-bottom: 1px solid #dce4ec;
      cursor: pointer;
      &:hover, &.active {
        background-color: #0094cd;
        color: white;
      }
    }
  }
</style>
