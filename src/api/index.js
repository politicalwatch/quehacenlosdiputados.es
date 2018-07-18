import config from '@/config';
import axios from 'axios';

const qs = require("qs");

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
  getInitiatives(params, all=false) {
    Object.keys(params).forEach(key => !params[key] && delete params[key]);
    if (all) params['per_page'] = -1;

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
  },
  getOverallStats() {
    return axios
      .get(getEndpoint())
      .then(response => response.data);

    function getEndpoint() {
      return [
        config.URL,
        '/stats/overall'
      ].join('');
    }
  },
  getParliamentarygroupsRanking(topic, subtopic) {
    let params = {'topic': topic};
    if (subtopic) {
      params['subtopic'] = subtopic;
    }
    return axios
      .get(getEndpoint(), {
        params: params
      })
      .then(response => response.data.slice(0,5));

    function getEndpoint() {
      return [
        config.URL,
        '/stats/parliamentarygroups'
      ].join('');
    }
  },
  getPlacesRanking(topic, subtopic) {
    let params = {'topic': topic};
    if (subtopic) {
      params['subtopic'] = subtopic;
    }
    return axios
      .get(getEndpoint(), {
        params: params
      })
      .then(response => response.data);

    function getEndpoint() {
      return [
        config.URL,
        '/stats/places'
      ].join('');
    }
  }
};
