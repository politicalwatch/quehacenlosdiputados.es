import config from '@/config';
import axios from 'axios';

const qs = require("qs");


const kb = config.KNOWLEDGEBASE;
const params = {
  knowledgebase: kb
}

function mergeResults(response) {
  const result = response.data
  let output = []
  for (const item in result) {
    output = output.concat(result[item])
  }
  return output
}

export default {
  getTopics() {
    return axios.get(getEndpoint(), {params}).then(response => response.data);

    function getEndpoint() {
      return [
        config.BACKEND_URL,
        '/topics/'
      ].join('');
    }
  },
  getTopic(topicId) {
    return axios.get(getEndpoint(topicId), {params}).then(response => response.data);

    function getEndpoint(topicId) {
      return [
        config.BACKEND_URL,
        '/topics/',
        topicId
      ].join('');
    }
  },
  getGroups(params) {
    if (params === undefined) params = {};
    Object.keys(params).forEach(key => !params[key] && delete params[key]);
    params['knowledgebase'] = kb

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
        config.BACKEND_URL,
        '/parliamentary-groups/'
      ].join('');
    }
  },
  getGroup(parliamentarygroupId) {
    return axios.get(getEndpoint(parliamentarygroupId), {params}).then(response => response.data);

    function getEndpoint(parliamentarygroupId) {
      return [
        config.BACKEND_URL,
        '/parliamentary-groups/',
        parliamentarygroupId
      ].join('');
    }
  },
  getDeputies(params) {
    if (params === undefined) params = {};
    Object.keys(params).forEach(key => !params[key] && delete params[key]);
    params['knowledgebase'] = kb

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
        config.BACKEND_URL,
        '/deputies/'
      ].join('');
    }
  },
  getDeputy(deputyId) {
    return axios.get(getEndpoint(deputyId), {params}).then(response => response.data);

    function getEndpoint(deputyId) {
      return [
        config.BACKEND_URL,
        '/deputies/',
        deputyId
      ].join('');
    }
  },
  getPlaces() {
    return axios.get(getEndpoint(), {params}).then(response => response.data);

    function getEndpoint() {
      return [
        config.BACKEND_URL,
        '/places/'
      ].join('');
    }
  },
  getStatus() {
    return axios.get(getEndpoint(), {params}).then(response => response.data);

    function getEndpoint() {
      return [
        config.BACKEND_URL,
        '/initiative-status/'
      ].join('');
    }
  },
  getTypes() {
    return axios.get(getEndpoint(), {params}).then(response => response.data);

    function getEndpoint() {
      return [
        config.BACKEND_URL,
        '/initiative-types/'
      ].join('');
    }
  },
  getInitiatives(params) {
    Object.keys(params).forEach(key => !params[key] && delete params[key]);
    params['knowledgebase'] = kb

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
        config.BACKEND_URL,
        '/initiatives/'
      ].join('');
    }
  },
  getInitiative(id) {
    return axios
      .get(getEndpoint(id), {params})
      .then(response => response.data);

    function getEndpoint(id) {
      return [
        config.BACKEND_URL,
        '/initiatives/',
        id
      ].join('');
    }
  },
  saveAlert(search) {
    Object.keys(search).forEach(key => !search[key] && delete search[key]);
    search['knowledgebase'] = kb

    return axios
      .post(getEndpoint(), search)
      .then(response => response.data);

    function getEndpoint() {
      return [
        config.BACKEND_URL,
        '/alerts'
      ].join('');
    }
  },
  getTags(topicId) {
    return axios
      .get(getEndpoint(topicId), {params})
      .then(response => response.data.tags);

    function getEndpoint(topicId) {
      return [
        config.BACKEND_URL,
        '/topics/',
        topicId
      ].join('');
    }
  },
  getOverallStats() {
    return axios
      .get(getEndpoint(), {params})
      .then(response => response.data);

    function getEndpoint() {
      return [
        config.BACKEND_URL,
        '/stats/overall'
      ].join('');
    }
  },
  getLastdaysStats() {
    return axios
      .get(getEndpoint())
      .then(response => response.data);

    function getEndpoint() {
      return [
        config.BACKEND_URL,
        '/stats/lastdays'
      ].join('');
    }
  },
  getDeputiesRanking(topic, subtopic, limit = 5) {
    let params = {'topic': topic};
    if (subtopic) {
      params['subtopic'] = subtopic;
    }
    params['knowledgebase'] = kb
    return axios
      .get(getEndpoint(), {
        params: params
      })
      .then(response => {
        const result = mergeResults(response)
        return result.slice(0,limit)
      });

    function getEndpoint() {
      return [
        config.BACKEND_URL,
        '/stats/deputies'
      ].join('');
    }
  },
  getParliamentarygroupsRanking(topic, subtopic) {
    let params = {'topic': topic};
    params['knowledgebase'] = kb
    if (subtopic) {
      params['subtopic'] = subtopic;
    }
    return axios
      .get(getEndpoint(), {
        params: params
      })
      .then(response => {
        const result = mergeResults(response)
        return result.slice(0,5)
      });

    function getEndpoint() {
      return [
        config.BACKEND_URL,
        '/stats/parliamentarygroups'
      ].join('');
    }
  },
  getPlacesRanking(topic, subtopic) {
    let params = {'topic': topic};
    params['knowledgebase'] = kb
    if (subtopic) {
      params['subtopic'] = subtopic;
    }
    return axios
      .get(getEndpoint(), {
        params: params
      })
      .then(response => {
        const result = mergeResults(response)
        return result.slice(0,5)
      });

    function getEndpoint() {
      return [
        config.BACKEND_URL,
        '/stats/places'
      ].join('');
    }
  },
  annotate(text, file) {
    let formData = new FormData()
    formData.append('text', text)
    formData.append('file', file)

    return axios.post(
      getEndpoint(),
      {params},
      formData,
    )

    function getEndpoint() {
      return [
        config.BACKEND_URL,
        '/tagger/'
      ].join('');
    }
  },
  getScannerResult(taskID) {
    return axios.get(
      getEndpoint(taskID),
      {params}
    )

    function getEndpoint(taskID) {
      return [
        config.BACKEND_URL,
        '/tagger/result/',
        taskID
      ].join('');
    }
  },
  proxy(url) {
    return [
      config.BACKEND_URL,
      '/proxy?url=' + url
    ].join('');
  },
  getHome() {
    return axios.get(
      getEndpoint()
    )
      .then(response => {
        return response.data.length > 0 ? response.data[0] : null;
      });

    function getEndpoint() {
      return [
        config.HOMEBUILDER_URL,
        '/homes'
      ].join('');
    }
  },
  getHomeResourceUrl(path) {
      return [
        config.HOMEBUILDER_URL,
        path
      ].join('');
  }
};
