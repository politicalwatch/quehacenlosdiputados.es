<template>
  <div id="home" class="o-container o-section u-margin-top-4 u-margin-bottom-10">
    <h3>La vigilancia ciudadana como servicio público</h3>
    <div v-if="home" class="o-section">
      <h4>{{ home.Date }}: {{ home.TitleDate }}</h4>
      <figure>
        <img :src="getHomeImage()" alt="">
        <figcaption><a :href="home.ImageUrl" target="_blank">Unspash: Photo by {{ home.ImageAuthor }}</a></figcaption>
      </figure>
      <div class="o-section" v-if="relatedInitiatives.length">
        <h4>Iniciativas relacionadas</h4>
        <results :initiatives="relatedInitiatives" class="u-margin-bottom-4" :topicsStyles="topicsStyles"/>
        <a :href="home.RelatedInitiativesSearch">Más iniciativas</a>
      </div>
    </div>
    <div v-if="lastdays" class="o-section">
      <h4>Iniciativas en los últimos 7 días</h4>
      <ul>
        <li>{{ lastdays.legislative.initiatives }} legislativas ({{ lastdays.legislative.trend }})</li>
        <li>{{ lastdays.orientation.initiatives }} de orientación política ({{ lastdays.orientation.trend }})</li>
        <li>{{ lastdays.oversight.initiatives }} de control ({{ lastdays.oversight.trend }})</li>
      </ul>
    </div>
  </div>
</template>

<script>

  import Results from '@/components/Results';
  import config from '@/config';
  import api from '@/api';

  export default {
      name: 'home',
      components: {
          Results,
        },
      data: function() {
          return {
              home: null,
              relatedInitiatives: [],
              lastdays: null,
              topicsStyles: config.STYLES.topics
            }
        },
      methods: {
          getHome: function() {
              api.getHome()
                .then(home => {
                    this.home = home;
                    this._parseRelatedInitiatives();
                    this.getRelatedInitiatives();
                  })
                .catch(error => this.errors = error);
            },
          getHomeImage: function() {
              return this.home ?
                api.getHomeResourceUrl(this.home.Image.formats.small.url) :
                null
            },
          getLastdays: function() {
              api.getLastdaysStats()
                .then(lastdays => this.lastdays = lastdays)
                .catch(error => this.errors = error);
            },
          getRelatedInitiatives: function() {
              this.home.RelatedInitiativesIds.forEach(id => {
                  api.getInitiative(id)
                    .then(initiative => {
                        this.relatedInitiatives.push(initiative)
                      })
                    .catch(error => this.errors = error);
                });
            },
          _parseRelatedInitiatives: function() {
              if (this.home.RelatedInitiativesIds !== undefined) {
                  return
                }
              const RELATED_INITIATIVES = 6;
              this.home.RelatedInitiativesIds = [...Array(RELATED_INITIATIVES).keys()]
                .map(el => el+1)
                .map(el => this.home['Initiative'+el])
                .filter(element => element !== null);
              // for (let i=1; i<=RELATED_INITIATIVES; i++) delete this.home['Initiative'+i];
            },
        },
      created: function() {
          this.getHome();
          this.getLastdays();
        }
    }
</script>
