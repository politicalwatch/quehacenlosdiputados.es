<template>
  <div id="home" class="o-container u-margin-bottom-10 c-home">
    <div v-if="home">

      <ImageHeader :home="home" :image="getHomeImage()" class="u-margin-bottom-4" />

      <div class="o-section c-home__initiatives" v-if="relatedInitiatives.length">
        <h1 class="u-uppercase c-home__initiatives_title">Iniciativas relacionadas</h1>
        <a class="c-home__more u-border-link u-uppercase" :href="home.RelatedInitiativesSearch">Más iniciativas</a>
      </div>

      <results
        v-if="relatedInitiatives.length"
        :initiatives="relatedInitiatives"
        :topicsStyles="topicsStyles"
      />

      <LastActivity :lastdays="lastdays" />

    </div>
  </div>
</template>

<script>

  import Icon from '@/components/Icon';
  import ImageHeader from '@/components/ImageHeader';
  import LastActivity from '@/components/LastActivity';
  import Results from '@/components/Results';
  import config from '@/config';
  import api from '@/api';

  export default {
      name: 'home',
      components: {
          Icon,
          ImageHeader,
          LastActivity,
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
                api.getHomeResourceUrl(this.home.Image.formats.large.url) :
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
