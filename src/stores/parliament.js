import { defineStore } from "pinia";
import api from "@/api";

const state = () => {
  return {
    allTopics: [],
    allDeputies: [],
    allParliamentaryGroups: [],
    allTypes: [],
    allStatus: [],
    allPlaces: [],
  };
};

const getters = {
  getAllDeputiesName(state) {
    return state.allDeputies.map((deputy) => deputy.name);
  },
  getAllPlacesName(state) {
    return state.allPlaces.map((place) => place.name);
  },
  getAllParliamentaryGroups(state) {
    return state.allParliamentaryGroups;
  },
  getAllParliamentaryGroupsWithGoverment(state) {
    return ["Gobierno"].concat(state.allParliamentaryGroups);
  },
  getDeputyByName(state) {
    return (name) =>
      state.allDeputies.find((deputy) => {
        return deputy.name === name;
      });
  },
  getDeputiesByParliamentaryGroup(state) {
    return (parliamentarygroup) =>
      state.allDeputies.filter((deputy) => {
        return deputy.parliamentarygroup === parliamentarygroup;
      });
  },
  getParliamentaryGroupByName(state) {
    return (name) =>
      state.allParliamentaryGroups.find((group) => {
        return group.name === name;
      });
  },
  getAllTypesName(state) {
    return state.allTypes.map((type) => type.name);
  },
};

const actions = {
  getDeputies() {
    api
      .getDeputies()
      .then((response) => {
        this.allDeputies = response;
      })
      .catch((error) => (this.errors = error));
  },
  getTopics() {
    api
      .getTopics()
      .then((response) => {
        this.allTopics = response;
      })
      .catch((error) => (this.errors = error));
  },
  getParliamentaryGroups() {
    api
      .getGroups()
      .then((response) => {
        this.allParliamentaryGroups = response;
      })
      .catch((error) => (this.errors = error));
  },
  getPlaces(context) {
    api
      .getPlaces()
      .then((response) => {
        this.allPlaces = response;
      })
      .catch((error) => (this.errors = error));
  },
  getStatus() {
    api
      .getStatus()
      .then((response) => {
        this.allStatus = response;
      })
      .catch((error) => (this.errors = error));
  },
  getTypes() {
    api
      .getTypes()
      .then((response) => {
        this.allTypes = response;
      })
      .catch((error) => (this.errors = error));
  },
};

export const useParliamentStore = defineStore("parliament", {
  state,
  getters,
  actions,
});
