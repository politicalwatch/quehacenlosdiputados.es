import config from '@/config';
import axios from 'axios';

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
        '/parliamentarygroups/'
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
      .get(getEndpoint(), { params: params })
      .then(response => response.data);

    function getEndpoint() {
      return [
        config.URL,
        '/initiatives/'
      ].join('');
    }
  }
};
