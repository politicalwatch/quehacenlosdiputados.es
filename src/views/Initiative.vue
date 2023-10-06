<template>
  <div class="c-initiative">
    <div
      v-if="loaded"
      id="initiative"
      class="o-container o-section u-margin-bottom-10"
    >
      <div class="o-grid o-grid--between">
        <div class="o-grid__col u-12 u-8@md">
          <h2>{{ initiative.title }}</h2>
          <div class="o-grid">
            <div
              class="o-grid__col u-12 u-4@sm u-text-center u-text-left@sm c-initiative__status"
            >
              <initiative-status :initiative="initiative" />
            </div>
            <div
              class="o-grid__col u-12 u-8@sm u-text-left u-text-center u-text-right@sm"
            >
              <conversation-link
                v-if="showConversation()"
                :id="initiative.id"
                :isAnswer="isAnswer()"
              ></conversation-link>
              &nbsp; &nbsp;
              <congress-link :url="initiative.url"></congress-link>
            </div>
          </div>

          <div class="o-grid u-padding-top-2 u-margin-bottom-4">
            <div class="o-grid__col o-grid__col--fill">
              <h6 class="u-uppercase">Tipo de acto parlamentario</h6>
              <p class="c-initiative__info">
                {{ initiative.initiative_type_alt }}
              </p>
            </div>
            <div class="o-grid__col u-12 u-3@sm">
              <h6 class="u-uppercase">Referencia</h6>
              <p class="c-initiative__info">{{ initiative.reference }}</p>
            </div>
            <div class="o-grid__col u-12 u-3@sm">
              <h6 class="u-uppercase">Registro</h6>
              <p class="c-initiative__info">
                {{ formattedDate }}
              </p>
            </div>
          </div>

          <topics-section
            class="u-hide u-block@md"
            :topicsStyles="styles.topics"
            :initiative="initiative"
          />
        </div>

        <div class="o-grid__col u-12 u-3@md">
          <div class="u-margin-bottom-4">
            <GovernmentCard v-if="isAGovernmentInitiative()" />
            <div v-else-if="isAGroupInitiative()">
              <ParliamentaryGroupCard
                v-for="author in initiative.authors"
                v-bind:key="author"
                :parliamentary_group="getGroup(author)"
                layout="small"
              />
            </div>
            <div v-else>
              <OtherAuthorCard
                v-for="author in initiative.authors"
                v-bind:key="author"
                :name="author"
              ></OtherAuthorCard>
            </div>

            <div class="u-margin-bottom-4"></div>

            <deputy-card
              v-for="deputyName in initiative.deputies"
              v-bind:key="deputyName"
              :deputy="this.store.getDeputyByName(deputyName)"
              layout="medium"
            />
          </div>
        </div>

        <div class="u-hide@md">
          <topics-section
            :topicsStyles="styles.topics"
            :initiative="initiative"
          />
        </div>
      </div>
    </div>
    <div v-else class="o-container o-section u-margin-bottom-10">
      <loader title="Cargando datos" subtitle="Puede llevar unos segundos" />
    </div>
  </div>
</template>

<script>
import ParliamentaryGroupCard from "@/components/ParliamentaryGroupCard.vue";
import GovernmentCard from "@/components/GovernmentCard.vue";
import OtherAuthorCard from "@/components/OtherAuthorCard.vue";
import CongressLink from "@/components/CongressLink.vue";
import ConversationLink from "@/components/ConversationLink.vue";
import CustomText from "@/components/CustomText.vue";
import TopicsSection from "@/components/TopicsSection.vue";
import InitiativeStatus from "@/components/InitiativeStatus.vue";
import DeputyCard from "@/components/DeputyCard.vue";
import TopicPill from "@/components/TopicPill.vue";
import Results from "@/components/Results.vue";
import Loader from "@/components/Loader.vue";
import api from "@/api";
import config from "@/config";
import { useParliamentStore } from "@/stores/parliament";

import format from "date-fns/format";

export default {
  name: "initiative",
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
  setup() {
    const store = useParliamentStore();
    return { store };
  },
  data: function () {
    return {
      initiative: {},
      styles: config.STYLES,
      loaded: false,
    };
  },
  computed: {
    dataLoaded: function () {
      return (
        Object.keys(this.initiative).length && this.store.allTopics.length > 0
      );
    },
    formattedDate: function () {
      return format(new Date(this.initiative.created), "dd/MM/Y");
    },
  },
  methods: {
    getInitiative: function () {
      api
        .getInitiative(this.$route.params.id)
        .then((response) => {
          this.initiative = response;
          this.loaded = true;
        })
        .catch((error) => {
          this.errors = error;
          this.loaded = true;
        });
    },
    getGroup: function (parliamentary_group) {
      for (const group of this.store.allParliamentaryGroups) {
        if (group.name == parliamentary_group) {
          return group;
        }
      }
    },
    isAGovernmentInitiative: function () {
      return this.initiative.authors.includes("Gobierno");
    },
    isAGroupInitiative: function () {
      if (this.initiative.authors.length == 0) return false;
      else {
        const aPossibleGroup = this.initiative.authors[0];
        for (const group of this.store.allParliamentaryGroups) {
          if (group.name == aPossibleGroup) return true;
        }
        return false;
      }
    },
    showConversation: function () {
      return (
        this.initiative.status == "Respondida" &&
        ["179", "184"].includes(this.initiative.initiative_type)
      );
    },
    isAnswer: function () {
      return this.initiative.initiative_type_alt == "Respuesta";
    },
  },
  metaInfo() {
    const title = this.initiative?.title
      ? `${this.initiative.title} - Qué hacen los diputados`
      : "- Qué hacen los diputados";

    return {
      title,
      meta: [
        {
          property: "og:title",
          content: title,
          vmid: "og:title",
        },
        {
          property: "twitter:title",
          content: title,
          vmid: "twitter:title",
        },
      ],
    };
  },
  created: function () {
    this.getInitiative();
  },
  watch: {
    $route: "getInitiative",
  },
};
</script>

<style lang="scss">
#initiative {
  .c-congress-link {
    display: inline-block;
    margin-bottom: 37px;
  }
}
</style>
