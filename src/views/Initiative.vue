<template>
  <div class="c-initiative">
    <div v-if="loaded" id="initiative" class="o-container o-section u-margin-bottom-10">
      <div class="o-grid o-grid--between">
        <div class="o-grid__col u-12 u-8@md">
          <h2>{{ initiative.title }}</h2>
          <div class="o-grid">
            <div class="o-grid__col u-12 u-4@sm u-text-center u-text-left@sm c-initiative__status">
              <initiative-status :initiative="initiative" />
            </div>
            <div class="o-grid__col u-12 u-8@sm u-text-left u-text-center u-text-right@sm">
              <conversation-link v-if="showConversation()" :id="initiative.id" :isAnswer="isAnswer()"></conversation-link>
              &nbsp;
              &nbsp;
              <congress-link :url="initiative.url"></congress-link>
            </div>
          </div>

          <div class="o-grid u-padding-top-2 u-margin-bottom-4">
            <div class="o-grid__col o-grid__col--fill">
              <h6 class="u-uppercase">Tipo de acto parlamentario</h6>
              <p class="c-initiative__info">{{ initiative.initiative_type_alt }}</p>
            </div>
            <div class="o-grid__col u-12 u-3@sm">
              <h6 class="u-uppercase">Referencia</h6>
              <p class="c-initiative__info">{{ initiative.reference }}</p>
            </div>
            <div class="o-grid__col u-12 u-3@sm">
              <h6 class="u-uppercase">Registro</h6>
              <p class="c-initiative__info">{{ moment(initiative.created).format('DD/MM/Y') }}</p>
            </div>
          </div>

          <topics-section class="u-hide u-block@md" :topicsStyles="styles.topics" :initiative="initiative"/>

        </div>

        <div class="o-grid__col u-12 u-3@md">
          <div class="u-margin-bottom-4">

            <GovernmentCard v-if="isAGovernmentInitiative()" />
            <div v-else-if="isAGroupInitiative()">
              <ParliamentaryGroupCard v-for="author in initiative.authors" v-bind:key="author" :parliamentary_group="getGroup(author)" layout="small"/>
            </div>
            <div v-else>
              <OtherAuthorCard v-for="author in initiative.authors" v-bind:key="author" :name="author"></OtherAuthorCard>
            </div>

            <div class="u-margin-bottom-4"></div>

            <deputy-card v-for="deputyName in initiative.deputies" v-bind:key="deputyName" :deputy="getDeputyByName(deputyName)" layout="medium" />

          </div>
        </div>

        <div class="u-hide@md">

          <topics-section :topicsStyles="styles.topics" :initiative="initiative"/>

        </div>
      </div>
    </div>
    <div v-else class="o-container o-section u-margin-bottom-10">
      <loader title="Cargando datos" subtitle="Puede llevar unos segundos"/>
    </div>
  </div>
</template>

<script>

import ParliamentaryGroupCard from '@/components/ParliamentaryGroupCard.vue';
import GovernmentCard from '@/components/GovernmentCard.vue';
import OtherAuthorCard from '@/components/OtherAuthorCard.vue';
import CongressLink from '@/components/CongressLink.vue';
import ConversationLink from '@/components/ConversationLink.vue';
import CustomText from '@/components/CustomText.vue';
import TopicsSection from '@/components/TopicsSection.vue';
import InitiativeStatus from '@/components/InitiativeStatus.vue';
import DeputyCard from '@/components/DeputyCard.vue';
import TopicPill from '@/components/TopicPill.vue';
import Results from '@/components/Results.vue';
import Loader from '@/components/Loader.vue';
import api from '@/api';
import config from '@/config';
import { mapGetters, mapState } from 'vuex';

import moment from 'moment';
moment.locale('es');

export default {
  name: 'initiative',
  components: {
    ParliamentaryGroupCard,
    GovernmentCard,
    OtherAuthorCard,
    CongressLink,
    ConversationLink,
    CustomText,
    TopicsSection,
    InitiativeStatus,
    DeputyCard,
    TopicPill,
    Results,
    Loader,
  },
  data: function() {
    return {
      initiative: {},
      moment: moment,
      styles: config.STYLES,
      loaded: false,
    }
  },
  computed: {
    ...mapGetters({
      getDeputyByName: 'getDeputyByName',
    }),
    ...mapState(['allDeputies', 'allTopics', 'allParliamentaryGroups']),
    dataLoaded: function() {
      return (Object.keys(this.initiative).length && this.allTopics.length > 0);
    },
  },
  methods: {
    getInitiative: function() {
      api.getInitiative(this.$route.params.id)
        .then(response => {
          this.initiative = response;
          this.loaded = true;
          window.document.title = window.document.head.querySelector('meta[property="og:title"]').content = window.document.head.querySelector('meta[name="twitter:title"]').content = `${this.initiative.title} - ${config.DEFAULT_PAGE_TITLE}`;
        })
        .catch(error => {
          this.errors = error;
          this.loaded = true;
        });
    },
    getGroup: function(parliamentary_group) {
      for (const group of this.allParliamentaryGroups) {
        if (group.name == parliamentary_group) {
          return group
        }
      }
    },
    isAGovernmentInitiative: function() {
      return this.initiative.authors.includes('Gobierno')
    },
    isAGroupInitiative: function() {
      if (this.initiative.authors.length == 0) return false
      else {
        const aPossibleGroup = this.initiative.authors[0]
        for (const group of this.allParliamentaryGroups) {
          if (group.name == aPossibleGroup) return true
        }
        return false
      }
    },
    showConversation: function() {
      return this.initiative.status == 'Respondida' && ['179', '184'].includes(this.initiative.initiative_type)
    },
    isAnswer: function() {
      return this.initiative.initiative_type_alt == 'Respuesta'
    }
  },
  created: function() {
    this.getInitiative();
  },
  watch: {
    '$route': 'getInitiative'
  }
}
</script>

<style lang="scss">

#initiative {
  .c-congress-link {
    display: inline-block;
    margin-bottom: 37px;
  }
}

</style>
