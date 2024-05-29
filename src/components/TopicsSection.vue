<template>
  <div v-if="isTagged()" class="c-topics c-topics--extended" id="tagged">
    <h3
      v-for="kb in getKnowledgebases()"
      :key="kb"
      :class="{ 'c-topics__label--active': kb == activeKb }"
      class="c-topics__label u-uppercase"
    >
      <a @click="activateKb(kb)" href="#tagged"
        ><ODSIcon icon="ods" v-if="kb == 'ods'" />{{ titles[kb] }}</a
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

<script setup>
import { ref } from "vue";
import qs from "qs";

import ODSIcon from "@/assets/svg/icon-ods.svg";
import * as Utils from "@/utils";

const { initiative, topicsStyles } = defineProps({
  initiative: {
    type: Object,
    required: true,
  },
  topicsStyles: {
    type: Object,
  },
});

const titles = {
  politicas: "Temáticas",
  ods: "Agenda 2030",
};
const activeKb = ref("politicas");

const activateKb = (kb) => {
  activeKb.value = kb;
};

const isTagged = () => {
  return initiative.tagged.some(
    (item) => item.topics.length > 0 || item.tags.length > 0
  );
};

const getKnowledgebases = () => {
  const kbs = [];
  for (const tagged of initiative["tagged"]) {
    if (tagged["topics"].length > 0) {
      kbs.push(tagged["knowledgebase"]);
    }
  }
  return kbs.sort().reverse();
};

const getTopics = (kb) => {
  let topics = [];
  for (const tagged of initiative["tagged"]) {
    if (tagged["knowledgebase"] == kb) {
      topics = topics.concat(tagged["topics"]);
    }
  }
  return topics.slice().sort(Utils.naturalSort);
};

const getTags = (kb) => {
  let tags = [];
  for (const tagged of initiative["tagged"]) {
    if (tagged["knowledgebase"] == kb) {
      tags = tags.concat(tagged["tags"]);
    }
  }
  return tags;
};

const getSubtopics = (topic) => {
  const tags = getTags(activeKb.value);
  return [
    ...new Set(
      tags.filter((tag) => tag.topic === topic).map((tag) => tag.subtopic)
    ),
  ];
};

const getTagsBySubtopic = (subtopic) => {
  const tags = getTags(activeKb.value);
  return tags.filter((tag) => tag.subtopic === subtopic).map((tag) => tag.tag);
};

const paramsData = (currentTopic, currentSubtopic, currentTag) => {
  return qs.stringify({
    topic: currentTopic,
    subtopics: currentSubtopic ? currentSubtopic : undefined,
    tags: currentTag ? currentTag : undefined,
  });
};

const getP2030SearchLink = (params) => {
  const baseUrl = "https://www.parlamento2030.es/resultados/";
  return baseUrl + params;
};
</script>
