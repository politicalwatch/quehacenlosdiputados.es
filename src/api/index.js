import config from '@/config';
import axios from 'axios';

var qs = require("qs");


export default {
  getTopics() {
    return axios.get(getEndpoint()).then(response => response.data);

    function getEndpoint() {
      return [
        config.URL,
        '/topics/'
      ].join('');
    }
  },
  getGroups() {
    return axios.get(getEndpoint()).then(response => response.data);

    function getEndpoint() {
      return [
        config.URL,
        '/parliamentary-groups/'
      ].join('');
    }
  },
  getDeputies() {
    return axios.get(getEndpoint()).then(response => response.data);

    function getEndpoint() {
      return [
        config.URL,
        '/deputies/'
      ].join('');
    }
  },
  getPlaces() {
    return axios.get(getEndpoint()).then(response => response.data);

    function getEndpoint() {
      return [
        config.URL,
        '/places/'
      ].join('');
    }
  },
  getStatus() {
    return axios.get(getEndpoint()).then(response => response.data);

    function getEndpoint() {
      return [
        config.URL,
        '/initiative-status/'
      ].join('');
    }
  },
  getTypes() {
    return axios.get(getEndpoint()).then(response => response.data);

    function getEndpoint() {
      return [
        config.URL,
        '/initiative-types/'
      ].join('');
    }
  },
  getInitiatives(params) {
    return axios
      .get(getEndpoint(), {
        params: params,
        paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        },
      })
      .then(response => response.data);

    function getEndpoint() {
      return [
        config.URL,
        '/initiatives/'
      ].join('');
    }
  },
  getInitiative(id) {
    return axios
      .get(getEndpoint(id))
      .then(response => response.data);

    function getEndpoint() {
      return [
        config.URL,
        '/initiatives/',
        id
      ].join('');
    }
  },
  getTags(topicId) {
    return axios
      .get(getEndpoint(topicId))
      .then(response => response.data.tags);

    function getEndpoint() {
      return [
        config.URL,
        '/topics/',
        topicId
      ].join('');
    }
  }
};
