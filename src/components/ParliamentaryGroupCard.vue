<template>
  <div
    :class="'c-parliamentary_group_card c-parliamentary_group_card__' + layout"
  >
    <div
      class="c-parliamentary_group_card__overlay"
      :style="getBackground()"
    ></div>
    <div v-if="layout == 'large'" class="c-parliamentary_group_card__wrapper">
      <h1 class="u-uppercase">{{ getGroupName() }}</h1>
      <h3 class="u-uppercase">
        <icon icon="person" class="c-icon--secondary c-icon--white" />{{
          parliamentaryGroup.composition.deputies
        }}
        Diputados/as
      </h3>
      <div class="c-parliamentary_group_card__icons">
        <PartyLogoIcon
          v-for="party in parliamentaryGroup.parties"
          :key="party"
          :party="party"
        />
      </div>
    </div>
    <div v-if="layout == 'medium'" class="c-parliamentary_group_card__wrapper">
      <router-link
        :to="{
          name: 'parliamentarygroup',
          params: { id: parliamentaryGroup.id },
        }"
      >
        <h3 class="u-uppercase">{{ getGroupName() }}</h3>
        <h4 class="u-uppercase">
          <icon icon="person" class="c-icon--secondary c-icon--white" />{{
            parliamentaryGroup.composition.deputies
          }}
          Diputados/as
        </h4>
        <div class="c-parliamentary_group_card__icons">
          <PartyLogoIcon
            v-for="party in parliamentaryGroup.parties"
            :key="party"
            :party="party"
          />
        </div>
      </router-link>
    </div>
    <div v-if="layout == 'small'" class="c-parliamentary_group_card__wrapper">
      <router-link
        :to="{
          name: 'parliamentarygroup',
          params: { id: parliamentaryGroup.id },
        }"
      >
        <h4 class="u-uppercase">{{ getGroupName() }}</h4>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import PartyLogoIcon from "@/components/PartyLogoIcon.vue";

const { parliamentaryGroup, layout } = defineProps({
  parliamentaryGroup: { type: Object },
  layout: { type: String },
});

const getBackground = () => {
  const bg = parliamentaryGroup.color;
  if (bg.length == 7) {
    return "background-color:" + bg;
  }
  return "background-image:" + bg;
};

const getGroupName = () => {
  if (layout == "small") {
    const short_name = parliamentaryGroup.name.replace(
      "Grupo Parlamentario",
      "GP"
    );
    if (short_name.length < 23) {
      return short_name;
    }
    return short_name.substring(0, 24) + "...";
  }

  return parliamentaryGroup.name;
};
</script>
