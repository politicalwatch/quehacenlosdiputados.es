import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';

Vue.use(Vuex);

const types = {
  GET_DEPUTIES: 'GET_DEPUTIES',
  GET_TOPICS: 'GET_TOPICS',
  GET_PARLIAMENTARY_GROUPS: 'GET_PARLIAMENTARY_GROUPS',
  GET_PLACES: 'GET_PLACES',
  GET_STATUS: 'GET_STATUS',
  GET_TYPES: 'GET_TYPES',
};

const state = {
  allTopics: [],
  allDeputies: [],
  allParliamentaryGroups: [],
  allTypes: [],
  allStatus: [],
  allPlaces: [],
};

const getters = {
  allDeputiesName(state) {
    return state.allDeputies.map(deputy => deputy.name)
  },
  allPlacesName(state) {
    return state.allPlaces.map(place => place.name)
  },
  allParliamentaryGroupsWithGoverment(state) {
    return ['Gobierno'].concat(state.allParliamentaryGroups)
  },
  getDeputyByName(state) {
    return name => state.allDeputies.find(deputy =>{
      return deputy.name === name
    });
  },
  getDeputiesByParliamentaryGroup(state) {
    return parliamentarygroup => state.allDeputies.filter(deputy =>{
      return deputy.parliamentarygroup === parliamentarygroup
    });
  },
  getParliamentaryGroupByName(state) {
    return name => state.allParliamentaryGroups.find(group =>{
      return group.name === name
    });
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
  getPlaces(context) {
    api.getPlaces()
      .then(response => {
        context.commit(types.GET_PLACES, response);
      })
      .catch(error => this.errors = error);
  },
  getStatus(context) {
    api.getStatus()
      .then(response => {
        context.commit(types.GET_STATUS, response);
      })
      .catch(error => this.errors = error);
  },
  getTypes(context) {
    api.getTypes()
      .then(response => {
        context.commit(types.GET_TYPES, response);
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
  [types.GET_PLACES](state, places) {
    state.allPlaces = places;
  },
  [types.GET_STATUS](state, status) {
    state.allStatus = status;
  },
  [types.GET_TYPES](state, types) {
    state.allTypes = types;
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
