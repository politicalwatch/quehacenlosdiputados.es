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
  getTopic(topicId) {
    return axios.get(getEndpoint(topicId)).then(response => response.data);

    function getEndpoint(topicId) {
      return [
        config.URL,
        '/topics/',
        topicId
      ].join('');
    }
  },
  getGroups(params) {
    if (params === undefined) params = {};
    Object.keys(params).forEach(key => !params[key] && delete params[key]);

    return axios
      .get(getEndpoint(), {
        params: params,
        paramsSerializer: function (params) {
          return qs.stringify(params)
        },
      })
      .then(response => response.data);

    function getEndpoint() {
      return [
        config.URL,
        '/parliamentary-groups/'
      ].join('');
    }
  },
  getGroup(parliamentarygroupId) {
    return axios.get(getEndpoint(parliamentarygroupId)).then(response => response.data);

    function getEndpoint(parliamentarygroupId) {
      return [
        config.URL,
        '/parliamentary-groups/',
        parliamentarygroupId
      ].join('');
    }
  },
  getDeputies(params) {
    if (params === undefined) params = {};
    Object.keys(params).forEach(key => !params[key] && delete params[key]);

    return axios
      .get(getEndpoint(), {
        params: params,
        paramsSerializer: function (params) {
          return qs.stringify(params)
        },
      })
      .then(response => response.data);

    function getEndpoint() {
      return [
        config.URL,
        '/deputies/'
      ].join('');
    }
  },
  getDeputy(deputyId) {
    return axios.get(getEndpoint(deputyId)).then(response => response.data);

    function getEndpoint(deputyId) {
      return [
        config.URL,
        '/deputies/',
        deputyId
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
    Object.keys(params).forEach(key => !params[key] && delete params[key]);

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

    function getEndpoint(id) {
      return [
        config.URL,
        '/initiatives/',
        id
      ].join('');
    }
  },
  saveAlert(search) {
    Object.keys(search).forEach(key => !search[key] && delete search[key]);

    return axios
      .post(getEndpoint(), search)
      .then(response => response.data);

    function getEndpoint() {
      return [
        config.URL,
        '/alerts'
      ].join('');
    }
  },
  getTags(topicId) {
    return axios
      .get(getEndpoint(topicId))
      .then(response => response.data.tags);

    function getEndpoint(topicId) {
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
  getDeputiesRanking(topic, subtopic, limit = 5) {
    let params = {'topic': topic};
    if (subtopic) {
      params['subtopic'] = subtopic;
    }
    return axios
      .get(getEndpoint(), {
        params: params
      })
      .then(response => response.data.slice(0,limit));

    function getEndpoint() {
      return [
        config.URL,
        '/stats/deputies'
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
  },
  annotate(text) {
    return axios.post(
      getEndpoint(),
      qs.stringify({ 'text': text })
    ).then(response => response.data);

    function getEndpoint() {
      return [
        config.URL,
        '/labels/extract'
      ].join('');
    }
  },
  getScannerResult(taskID) {
    return axios.get(
      getEndpoint(taskID)
    )

    function getEndpoint(taskID) {
      return [
        config.URL,
        '/labels/result/',
        taskID
      ].join('');
    }
  }
};
