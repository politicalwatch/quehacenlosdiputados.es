<template>
  <div>
    <article class="c-initiative-card" :id="`initiative-card-${initiative.id}`">
      <h2 class="c-initiative-card__title">
        <router-link v-if="initiative.id" :to="{name: 'initiative', params: { id: initiative.id }}">{{ initiative.title }}</router-link>
        <span v-else>{{ initiative.title }}</span>
      </h2>
      <div class="c-initiative-card__groups-gov-others" v-if="hasAuthors(initiative) && extendedLayout">
        <h5 v-if="hasAuthors(initiative)" v-html="getAuthors(initiative)"></h5>
      </div>
      <div class="c-initiative-card__deputies" v-if="initiative.deputies.length > 0 && extendedLayout">
        <deputy-card v-for="deputyName in initiative.deputies" :deputy="getDeputyByName(deputyName)" layout="small" />
      </div>
      <router-link v-if="initiative.id" :to="{name: 'initiative', params: { id: initiative.id }}" v-slot="{ href }">
        <a :href="href" target="_blank">
          <topic-pill class="c-initiative-card__topics" :topicsStyles="topicsStyles" :topics="getTopics(initiative)" :limit="3" v-if="hasTopics(initiative)" />
        </a>
      </router-link>
      <initiative-status :initiative="initiative" />
    </article>
  </div>
</template>

<script>
const moment = require('moment');
moment.locale('es');

import Icon from './Icon';
import TopicPill from './TopicPill';
import InitiativeStatus from './InitiativeStatus';
import DeputyCard from '@/components/DeputyCard';
import { mapGetters } from 'vuex';

export default {
  name: 'InitiativeCard',
  components: {
    Icon,
    TopicPill,
    InitiativeStatus,
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
  },
  computed: {
    ...mapGetters({
      getDeputyByName: 'getDeputyByName',
    }),
  },
  methods: {
    __cleansIfItsAGroup: function(value) {
      return value.replace('Grupo Parlamentario', 'GP')
    },
    hasAuthors: function(initiative) {
      return initiative.authors.length > 0;
    },
    getAuthors: function(initiative) {
      let html = '';
      for (const author of initiative.authors) {
        html += '<span>' + this.__cleansIfItsAGroup(author) + '</span>';
      }
      return html
    },
    getTopics: function(initiative) {
      let topics = []
      for (const tagged of initiative['tagged']) {
        topics = topics.concat(tagged['topics'])
      }
      return topics
    },
    hasTopics: function(initiative) {
      if (initiative['tagged'].lenght == 0) return false;
      if (initiative['tagged'][0].topics.lenght == 0) return false;
      return true;
    },
  },
};
</script>

<style scoped lang="scss">
</style>
