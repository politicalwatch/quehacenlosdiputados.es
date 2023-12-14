<template>
  <div :class="'c-deputy-card ' + layout + '-layout'">
    <div class="c-deputy-card__wrapper">
      <router-link
        :to="{ name: 'deputy', params: { id: deputy.id } }"
        style="position: relative"
      >
        <img
          :src="deputy.image"
          :title="deputy.name"
          :class="
            'c-deputy-card__wrapper__image c-deputy-card__wrapper__image-' +
            layout
          "
        />
        <party-logo-icon
          :party="deputy.party_name"
          v-if="layout == 'large'"
          style="position: absolute; bottom: 0; left: 6rem"
        />
      </router-link>

      <div v-if="layout != 'small'" class="c-deputy-card__wrapper__info">
        <footprint
          v-if="layout == 'large'"
          :footprint="getFootprint()"
          :small="true"
        />
        <router-link :to="{ name: 'deputy', params: { id: deputy.id } }">
          <h4 v-html="getSeparatedName()"></h4>
        </router-link>
        <p>{{ deputy.parliamentarygroup }}</p>
        <h5 v-if="layout == 'large'">
          <icon icon="location" />{{ deputy.constituency }}
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
import Footprint from "@/components/Footprint.vue";
import PartyLogoIcon from "@/components/PartyLogoIcon.vue";
import Icon from "@/components/Icon.vue";
import { useParliamentStore } from "@/stores/parliament";

export default {
  name: "DeputyCard",
  components: {
    Footprint,
    PartyLogoIcon,
    Icon,
  },
  props: {
    deputy: {
      type: Object,
      required: true,
    },
    layout: {
      type: String,
      default: "medium", // small, medium, large
    },
    footprint: String,
  },
  setup() {
    const store = useParliamentStore();
    return { store };
  },
  methods: {
    getSeparatedName: function () {
      return this.deputy.name.split(",").join(",<br/>");
    },
    getFootprint: function () {
      if (this.footprint != "General") {
        const filtered_footprint = this.deputy.footprint_by_topics.filter(
          (item) => item.name == this.footprint
        );
        /*console.log(filtered_footprint)*/
        return filtered_footprint[0]?.score ?? 0;
      }
      return this.deputy.footprint;
    },
  },
};
</script>
