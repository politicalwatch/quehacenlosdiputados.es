import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';

Vue.use(Vuex);

const types = {
  GET_DEPUTIES: 'GET_DEPUTIES',
  GET_TOPICS: 'GET_TOPICS',
  GET_PARLIAMENTARY_GROUPS: 'GET_PARLIAMENTARY_GROUPS',
};

const state = {
  allTopics: [],
  allDeputies: [],
  allParliamentaryGroups: [],
};

const getters = {
  allDeputiesName(state) {
    return state.allDeputies.map(deputy => deputy.name)
  },
  allParliamentaryGroupsWithGoverment(state) {
    return ['Gobierno'].concat(state.allParliamentaryGroups)
  },
};

const actions = {
  getDeputies(context) {
    api.getDeputies()
      .then(response => {
        context.commit(types.GET_DEPUTIES, response);
      })
      .catch(error => this.errors = error);
  },
  getTopics(context) {
    api.getTopics()
      .then(response => {
        context.commit(types.GET_TOPICS, response);
      })
      .catch(error => this.errors = error);
  },
  getParliamentaryGroups(context) {
    api.getGroups()
      .then(response => {
        context.commit(types.GET_PARLIAMENTARY_GROUPS, response);
      })
      .catch(error => this.errors = error);
  },
};

const mutations = {
  [types.GET_DEPUTIES](state, deputies) {
    state.allDeputies = deputies;
  },
  [types.GET_TOPICS](state, topics) {
    state.allTopics = topics;
  },
  [types.GET_PARLIAMENTARY_GROUPS](state, parliamentaryGroups) {
    state.allParliamentaryGroups = parliamentaryGroups;
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
