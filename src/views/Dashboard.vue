<template>
  <div>
    <div style="width:100%;height:10px;background: url('/img/cascade.png') repeat-x;"></div>
    <navbar></navbar>
    <div id="dashboard">
      <page-header :title="'Métricas'"></page-header>
      <div class="container page">
        <div class="row">
          <div class="col-sm-12">
            <div class="well">
              <form id="search-form" class="form-horizontal" role="form" @submit.prevent="getResults">
                <fieldset>
                  <div class="form-group">
                    <label for="topic" class="col-sm-1 control-label">Objetivos</label>
                    <div class="col-sm-3">
                      <multiselect
                        @select="fillSubtopics"
                        v-model="data.topic"
                        :options="topics.map(topic => topic.name)"
                        name="topic" id="topic" placeholder="Todos">
                      </multiselect>
                    </div>
                    <label for="subtopics" class="col-sm-1 control-label">Metas</label>
                    <div class="col-sm-5">
                      <multiselect
                        v-model="data.subtopics"
                        :multiple="true"
                        :options="subtopics"
                        name="subtopics" id="subtopics" placeholder="Cualquiera">
                      </multiselect>
                    </div>
                    <div class="col-sm-2">
                      <button class="btn btn-primary pull-right" type="submit">Mostrar</button>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
            <!-- <div v&#45;if="this.loadingResults" class="text&#45;center"><h2>Loading results</h2></div> -->
            <!-- <results&#45;table v&#45;if="initiatives.length &#38;&#38; !this.loadingResults" :initiatives="initiatives"></results&#45;table> -->
            <div class="row">
              <div class="col-sm-12 widget">
                <h3>Comparando iniciativas</h3>
                <div class="row">
                  <div class="col-sm-6 text-center">
                    <svg width="200" height="200"><g transform="translate(100,100)"><g class="node"><circle r="87.5" fill="#abe8ff"></circle><circle fill="#0094cd" r="50"></circle></g></g></svg>
                  </div>
                  <div class="col-sm-6">
                    <p class="description">
                      Hay un total de <strong>140</strong> iniciativas de <strong>ODS o Meta</strong>, que en comparación con las iniciativas de <strong>ODS o Meta</strong>, el más activo, es un <strong>15%</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6 widget">
                <h3>Ranking de grupos</h3>
                <ul class="list-unstyled">
                  <li>
                    <span class="itemname">Grupo Confederal de Unidos Podemos-En Comú Podem-En Mare</span>
                  </li>
                  <li>
                    <span class="itemname">Grupo Socialista</span>
                  </li>
                  <li>
                    <span class="itemname">Grupo Ciudadanos</span>
                  </li>
                </ul>
              </div>
              <div class="col-sm-6 widget">
                <h3>Ranking de lugares</h3>
                <ul class="list-unstyled">
                  <li>
                    <span class="itemname">Comisión de Medio Ambiente</span>
                  </li>
                  <li>
                    <span class="itemname">Comisión de Agricultura</span>
                  </li>
                  <li>
                    <span class="itemname">Pleno</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 widget">
                <h3>Preguntas más antiguas sin responder</h3>
                <table class="table table-striped table-hover">
                  <tbody>
                    <tr>
                      <td>
                        <a href="#">Proposición no de Ley relativa a impulsar medidas contra la turismofobia en España</a> 
                      </td>
                      <td>
                        <small>2/7/2018</small>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#">Proposición no de Ley relativa a impulsar medidas contra la turismofobia en España</a> 
                      </td>
                      <td>
                        <small>2/7/2018</small>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#">Proposición no de Ley relativa a impulsar medidas contra la turismofobia en España</a> 
                      </td>
                      <td>
                        <small>2/7/2018</small>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#">Proposición no de Ley relativa a impulsar medidas contra la turismofobia en España</a> 
                      </td>
                      <td>
                        <small>2/7/2018</small>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#">Proposición no de Ley relativa a impulsar medidas contra la turismofobia en España</a> 
                      </td>
                      <td>
                        <small>2/7/2018</small>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div id="credits" class="row">
        <div class="col-sm-12 text-center">
          <small><strong>TIPI</strong> está licenciado bajo <a href="https://www.gnu.org/copyleft/gpl.html" target="_blank">GNU GPL v3</a></small>
          <br>
          <small>Hecho con ♥ por <a href="https://unmundosalvadorsoler.org/ciecode/" target="_blank">CIECODE (Fundacion Salvador Soler)</a></small>
        </div>
      </div>
    </div>
    <div style="width:100%;height:10px;background: url('/img/cascade.png') repeat-x;"></div>
  </div>
</template>

<script>
import Navbar from '@/components/navbar';
import PageHeader from '@/components/page-header';
import Multiselect from 'vue-multiselect'
import api from '@/api'

export default {
  name: 'dashboard',
  components: {
    Navbar,
    PageHeader,
    Multiselect
  },
  data: function() {
    return {
      topics: [],
      subtopics: [],
      data: {
        topic: '',
        subtopics: ''
      },
      loadingResults: false
    }
  },
  methods: {
    fillSubtopics: function(selectedTopic, clearValues) {
      this.data.subtopics = clearValues ? [] : this.data.subtopics;
      const currentTopic = this.topics.find(topic => topic.name === selectedTopic);
      this.getSubtopics(currentTopic.id);
    },
    getTopics: function() {
      api.getTopics()
        .then(topics => {
          this.topics = topics;
          if (this.data.topic) {
            this.fillSubtopics(this.data.topic, false);
          }
        })
        .catch(error => this.errors = error);
    },
    getSubtopics: function(topicID) {
      api.getTags(topicID)
        .then(tags => {
          this.subtopics = [...new Set(tags.map(tag => tag.subtopic))];
        })
        .catch(error => this.errors = error);
    },
    prepareForm: function() {
      this.getTopics();
    }
  },
  created: function() {
    this.prepareForm();
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped lang="scss">
#dashboard {
  .widget {
    padding: 20px 0px;
    h3 {
      text-decoration: underline;
    }
  }
  .description {
    font-size: 1.3em;
  }
  .itemname {
    font-size: 1.2em;
    font-weight: bold;
  }
}
</style>
