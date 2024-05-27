<template>
  <div class="c-text" v-if="is(value)">
    <h6 class="c-text__label">{{ meta }}</h6>
    <p v-if="!source" class="c-text__value" v-html="show(value)"></p>
    <ul class="c-text__list" v-if="source">
      <li
        v-for="(v, i) in value"
        :key="i"
        class="c-text__list-item"
        :class="{ 'c-text__list-item--image': hasImage(v) }"
      >
        <router-link
          :to="{ name: type, params: { id: getPeopleFromName(v).id } }"
          v-if="hasImage(v)"
        >
          <img
            class="c-text__image"
            :alt="v"
            :src="getPeopleFromName(v).image"
          />
        </router-link>

        <div class="c-text__wrapper" v-if="getPeopleFromName(v)">
          <router-link
            :to="{ name: type, params: { id: getPeopleFromName(v).id } }"
          >
            {{ getPeopleFromName(v).name }}
            <span v-if="!hideGroup">{{
              getPeopleFromName(v).parliamentarygroup
            }}</span>
          </router-link>
        </div>

        <span v-else>{{ v }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { meta, value, type, source, hideGroup } = defineProps({
  meta: String,
  value: [String, Array],
  type: String,
  source: Array,
  hideGroup: Boolean,
});

const getPeopleFromName = (string) => {
  if (string.hasOwnProperty("name")) return string;
  let regex_id = /\[.*\]/;
  let has_id = regex_id.exec(string);
  if (!has_id) return source.find((s) => s.name == string);
  let peopleId = has_id[0].replace("[", "").replace("]", "");
  return source.find((s) => s.id == peopleId);
};

const show = (value) => {
  if (value.constructor === Array) return value.join("<br/>");
  return value;
};

const hasImage = (name) => {
  return getPeopleFromName(name) && getPeopleFromName(name).image;
};

const is = (value) => {
  if (value === undefined) return false;
  if (value.constructor === String && value != "") return true;
  if (value.constructor === Array && value.length > 0) return true;
  return false;
};
</script>
