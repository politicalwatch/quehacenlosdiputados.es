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
  }
};
