<template>
  <div class="c-topics">
    <span v-html="getTopics()" />
    <div v-if="limit && (limit < topics.length)" class="c-topics__topic c-topics__topic__small" style="background-color:#A3D5C8;">
      <icon icon="more" />
    </div>
  </div>
</template>

<script>
import Icon from './Icon';
import * as Utils from '@/utils';

export default {
  name: 'TopicPill',
  components: {
    Icon
  },
  props: {
    topics: Array,
    topicsStyles: Object,
    withLinks: Boolean,
    limit: Number,
  },
  methods: {
    getTopics: function() {
      let topics = this.topics
      if (this.limit) {
        topics = topics.slice(0, this.limit)
      }
      if (this.topicsStyles && topics.length) {
        return topics.slice().sort(Utils.naturalSort).map((element, i)=> {
          if (this.withLinks) {
            console.log(this.topicsStyles)
            console.log(element)
            return `
              <a href="#topic-${i}" class="c-topics__topic c-topics__topic__small" style="background-color:${this.topicsStyles[element].color}">
                ${this.topicsStyles[element].shortname}
              </a>
            `;
          } else {
            return `
              <div class="c-topics__topic c-topics__topic__small" style="background-color:${this.topicsStyles[element].color}">
                ${this.topicsStyles[element].shortname}
              </div>
            `;
          }
        }).join('');
      }
      return topics.length ?
        topics.join('<br/>') :
        '';
    },
  },
};
</script>
