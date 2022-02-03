<template>
  <div>
    <article class="c-initiative-card" :id="`initiative-card-${initiative.id}`">
      <h2 class="c-initiative-card__title">
        <router-link v-if="initiative.id" :to="{name: 'initiative', params: { id: initiative.id }}">{{ initiative.title }}</router-link>
        <span v-else>{{ initiative.title }}</span>
      </h2>
      <div class="c-initiative-card__authors" v-if="initiative.deputies && extendedLayout">
        <deputy-card v-for="deputyName in initiative.deputies" :deputy="getDeputyByName(deputyName)" layout="small" />
      </div>
      <div class="c-initiative-card__authors" v-if="getAuthors(initiative) && extendedLayout">
        <p v-html="getAuthors(initiative)"></p>
      </div>
      <router-link v-if="initiative.id" :to="{name: 'initiative', params: { id: initiative.id }}" v-slot="{ href }">
        <a :href="href" target="_blank">
          <topic-pill class="c-initiative-card__topics" :topicsStyles="topicsStyles" :topics="getTopics(initiative)" :limit="3" />
        </a>
      </router-link>
      <div class="o-grid">
        <div class="o-grid__col">
          <initiative-meta :initiative="initiative" :metaColors="metaColors" />
        </div>
        <div class="o-grid__col o-grid__col--right">
          <router-link v-if="initiative.id" :to="{name: 'initiative', params: { id: initiative.id }}" v-slot="{ href }">
        <a :href="href" target="_blank">
          <icon icon="open-blank" class="c-icon--secondary" />
        </a>
          </router-link>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
const moment = require('moment');
moment.locale('es');

import Icon from './Icon';
import TopicPill from './TopicPill';
import InitiativeMeta from './InitiativeMeta';
import DeputyCard from '@/components/DeputyCard';
import { mapGetters } from 'vuex';

export default {
  name: 'InitiativeCard',
  components: {
    Icon,
    TopicPill,
    InitiativeMeta,
    DeputyCard,
  },
  data: function() {
    return{
      moment: moment,
    };
  },
  props: {
    initiative: Object,
    topicsStyles: Object,
    extendedLayout: Boolean,
    metaColors: {type: Object, default: undefined},
  },
  computed: {
    ...mapGetters({
      getDeputyByName: 'getDeputyByName',
    }),
  },
  methods: {
    getAuthors: function(initiative) {
      return initiative.authors.length ?
        initiative.authors.join('<br/>') :
        '';
    },
    getTopics: function(initiative) {
      let topics = []
      for (const tagged of initiative['tagged']) {
        topics = topics.concat(tagged['topics'])
      }
      return topics
    },
  },
};
</script>

<style scoped lang="scss">
</style>
