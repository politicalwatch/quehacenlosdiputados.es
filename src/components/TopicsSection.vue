<template>
  <div v-if="isTagged()" class="c-topics c-topics--extended" id="tagged">
    <h3
      v-for="kb in getKnowledgebases()"
      :key="kb"
      :class="{ 'c-topics__label--active': kb == activeKb }"
      class="c-topics__label u-uppercase"
    >
      <a @click="activateKb(kb)" href="#tagged"
        ><icon icon="ods" v-if="kb == 'ods'" />{{ titles[kb] }}</a
      >
    </h3>
    <ul class="c-topics__list">
      <li
        v-for="(topic, i) in getTopics(activeKb)"
        :key="topic"
        class="c-topics__list-topic"
      >
        <a
          v-if="activeKb == 'ods'"
          :href="getP2030SearchLink(paramsData(topic))"
          :style="`background-color:${topicsStyles[topic].color}`"
          target="_blank"
          class="c-topics__topic"
          style="color: white"
          >{{ topic }}</a
        >
        <router-link
          v-if="activeKb != 'ods'"
          :id="`topic-${i}`"
          class="c-topics__topic"
          :style="`background-color:${topicsStyles[topic].color}`"
          :to="{ name: 'results', params: { data: paramsData(topic) } }"
        >
          {{ topic }}
        </router-link>

        <ul v-if="getSubtopics(topic)" class="c-topics__list-subtopic">
          <li
            v-for="subtopic in getSubtopics(topic)"
            :key="subtopic + ' - ' + topic"
            class="c-topics__subtopic"
          >
            <a
              v-if="activeKb == 'ods'"
              :href="getP2030SearchLink(paramsData(topic, subtopic))"
              target="_blank"
              class="c-topics__link"
              >{{ subtopic }}</a
            >
            <router-link
              v-if="activeKb != 'ods'"
              class="c-topics__link"
              :to="{
                name: 'results',
                params: { data: paramsData(topic, subtopic) },
              }"
            >
              {{ subtopic }}
            </router-link>

            <ul v-if="getTagsBySubtopic(subtopic)" class="c-topics__list-tags">
              <li
                v-for="tag in getTagsBySubtopic(subtopic)"
                :key="tag + ' - ' + topic"
                class="c-topics__tag"
              >
                <a
                  v-if="activeKb == 'ods'"
                  :href="getP2030SearchLink(paramsData(topic, subtopic, tag))"
                  target="_blank"
                  class="c-topics__link"
                  >{{ tag }}</a
                >
                <router-link
                  v-if="activeKb != 'ods'"
                  class="c-topics__link"
                  :to="{
                    name: 'results',
                    params: { data: paramsData(topic, subtopic, tag) },
                  }"
                >
                  {{ tag }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <a
        target="_blank"
        :href="'https://www.parlamento2030.es/initiatives/' + initiative.oldid"
        v-if="activeKb == 'ods'"
        >Ver más en Parlamento2030.es</a
      >
    </ul>
  </div>
</template>

<script>
import qs from "qs";

import Icon from "@/components/Icon.vue";
import * as Utils from "@/utils";

export default {
  name: "TopicsSection",
  components: {
    Icon,
  },
  props: {
    initiative: Object,
    topicsStyles: Object,
  },
  setup() {
    return { Utils };
  },
  data: function () {
    return {
      titles: {
        politicas: "Temáticas",
        ods: "Agenda 2030",
      },
      activeKb: "politicas",
    };
  },
  methods: {
    activateKb: function (kb) {
      this.activeKb = kb;
    },
    isTagged: function () {
      return this.initiative.tagged.some(
        (item) => item.topics.length > 0 || item.tags.length > 0
      );
    },
    getKnowledgebases: function () {
      const kbs = [];
      for (const tagged of this.initiative["tagged"]) {
        if (tagged["topics"].length > 0) {
          kbs.push(tagged["knowledgebase"]);
        }
      }
      return kbs.sort().reverse();
    },
    getTopics: function (kb) {
      let topics = [];
      for (const tagged of this.initiative["tagged"]) {
        if (tagged["knowledgebase"] == kb) {
          topics = topics.concat(tagged["topics"]);
        }
      }
      return topics.slice().sort(Utils.naturalSort);
    },
    getTags: function (kb) {
      let tags = [];
      for (const tagged of this.initiative["tagged"]) {
        if (tagged["knowledgebase"] == kb) {
          tags = tags.concat(tagged["tags"]);
        }
      }
      return tags;
    },
    getSubtopics(topic) {
      const tags = this.getTags(this.activeKb);
      return [
        ...new Set(
          tags.filter((tag) => tag.topic === topic).map((tag) => tag.subtopic)
        ),
      ];
    },
    getTagsBySubtopic: function (subtopic) {
      const tags = this.getTags(this.activeKb);
      return tags
        .filter((tag) => tag.subtopic === subtopic)
        .map((tag) => tag.tag);
    },
    paramsData: function (currentTopic, currentSubtopic, currentTag) {
      return qs.stringify({
        topic: currentTopic,
        subtopics: currentSubtopic ? currentSubtopic : undefined,
        tags: currentTag ? currentTag : undefined,
      });
    },
    getP2030SearchLink: function (params) {
      const baseUrl = "https://www.parlamento2030.es/resultados/";
      return baseUrl + params;
    },
  },
};
</script>
