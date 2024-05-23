<template>
  <div v-if="deputy" :class="'c-deputy-card ' + layout + '-layout'">
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

<script setup>
import Footprint from "@/components/Footprint.vue";
import PartyLogoIcon from "@/components/PartyLogoIcon.vue";
import Icon from "@/components/Icon.vue";
import config from "@/config";

const { deputy, layout, footprint } = defineProps({
  deputy: {
    type: Object,
    required: true,
  },
  layout: {
    type: String,
    default: "medium", // small, medium, large
  },
  footprint: String,
});

const getSeparatedName = () => {
  return deputy.name.split(",").join(",<br/>");
};

const getFootprint = () => {
  if (footprint != "General") {
    const filtered_footprint = deputy.footprint_by_topics.filter(
      (item) => item.name == footprint
    );
    return filtered_footprint[0]?.score ?? 0;
  }
  return deputy.footprint;
};

const groupColor = config.STYLES.parties[deputy.party_name]?.color ?? "#A3D5C8";
</script>

<style lang="scss" scoped>
.c-deputy-card {
  &__wrapper {
    &__image,
    &__image-large {
      border-color: v-bind(groupColor);
    }
  }
}
</style>
