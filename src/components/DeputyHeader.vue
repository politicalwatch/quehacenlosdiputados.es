<template>
  <div class="c-deputy" :class="addBirthdayClass()" v-if="deputy">
    <div class="o-container">
      <div class="o-grid  o-grid--reverse">
        <div class="o-grid__col u-4@sm">
          <div class="c-deputy__image_container">
            <img class="c-deputy__image" :src="deputy.image" :alt="'Foto de ' + deputy.name">
            <party-logo :party="deputy.party_name"/>
          </div>
        </div>
        <div class="o-grid__col u-12 u-8@sm">
          <h1 class="c-deputy__name">{{ deputy.name }}</h1>
          <h3 class="c-deputy__group" v-if="parliamentaryGroup">
            <router-link :to="{ name: 'parliamentarygroup', params: {id: parliamentaryGroup.id }}">
              {{ parliamentaryGroup.name }}
            </router-link>
          </h3>
          <div class="c-deputy__extra">
            <span class="c-deputy__personal"><icon v-if="addBirthdayClass()" icon="birthday"/>{{ getAge() }} años</span><span class="c-deputy__personal"><icon icon="location"/>{{ getConstituency() }}</span>
          </div>
          <div class="c-deputy__links">
            <slot/>
          </div>
        </div>
        <div class="o-grid__col u-12 u-12@sm c-deputy__more">
          <a href="#" @click="collapse">{{ getCollapseMessage() }}<icon :icon="getCollapseIcon()"/></a>
        </div>
        <div :class="getCollapsedClass()" class="o-grid__col u-12 u-4@sm">
          <h3>Declaraciones</h3>
          <p v-for="(link, title) in deputy.extra.declarations" :key="title"><icon icon="document" /><a :href="link">{{ title }}</a></p>
        </div>
        <div :class="getCollapsedClass()" class="o-grid__col u-12 u-4@sm">
          <h3>Cargos</h3>
          <p v-for="position in deputy.public_position" :key="position">{{ position }}</p>
        </div>
        <div :class="getCollapsedClass()" class="o-grid__col u-12 u-4@sm">
          <h3>Ficha personal</h3>
          <p v-for="entry in deputy.bio" :key="entry">{{ entry }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon';
import PartyLogo from './PartyLogo';

export default {
  name: 'DeputyHeader',
  components: {
    Icon,
    PartyLogo,
  },
  data: function () {
    return {
      isCollapsed: true,
    };
  },
  props: {
    deputy: Object,
    parliamentaryGroup: Object,
  },
  methods: {
    getCollapsedClass: function () {
      if (this.isCollapsed) {
        return 'c-deputy__hidden';
      }
      return 'c-deputy__info';
    },
    getCollapseIcon: function () {
      if (this.isCollapsed) {
        return 'plus';
      }
      return 'less';
    },
    getCollapseMessage: function () {
      if (this.isCollapsed) {
        return 'Mostrar más';
      }
      return 'Mostrar menos';
    },
    collapse: function () {
      this.isCollapsed = !this.isCollapsed;
    },
    addBirthdayClass: function () {
      const date = new Date(this.deputy.birthdate);
      const today = new Date();
      if (date.getDate() == today.getDate() && date.getMonth() == today.getMonth()) {
        return 'c-deputy__birthday';
      }
    },
    getAge: function() {
      const date = new Date(this.deputy.birthdate);
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      return age;
    },
    getConstituency: function() {
      const constituency = this.deputy.constituency;
      return constituency;
    },
  },
};
</script>

<style scoped lang="scss">
</style>
