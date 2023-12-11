<template>
  <div id="home" class="o-container u-margin-bottom-10 c-home">
    <div v-if="home">

      <ImageHeader :home="home" image="/img/home.jpg" alt="Inicio de la XV legislatura" class="u-margin-bottom-4" />

      <div class="o-grid o-grid--center o-grid--no-gutters">
        <div class="o-grid__col u-12 u-9@sm">
          <h2>Comienza la XV legislatura en el Congreso de los Diputados y con ella vuelve Qué Hacen Los Diputados</h2>
          <p>Como ya hicimos en anteriores legislaturas, vamos a monitorizar toda la actividad legislativa y parlamentaria de la Cámara baja para ayudar a la institución y a nuestros diputados y diputadas a cumplir con valores de gobernanza imprescindibles en nuestros días como la transparencia y la rendición de cuentas.</p>
          <p>A través de esta tecnología cívica monitorizamos de manera precisa toda la actividad legislativa y parlamentaria del Congreso obteniendo la siguiente información:</p>
          <div class="o-grid">
            <div class="o-grid__col u-12 u-margin-bottom-1 u-margin-bottom-0@sm u-4@sm"><span class="u-bg-yellow u-padding-1 u-block u-text-th4">Ranking de relevancia de la actividad de cada uno de los diputados y diputadas (huella)</span></div>
            <div class="o-grid__col u-12 u-margin-bottom-1 u-margin-bottom-0@sm u-4@sm"><span class="u-bg-yellow u-padding-1 u-block u-text-th4">Radiografía y resumen de la actividad de cada uno de los grupos parlamentarios</span></div>
            <div class="o-grid__col u-12 u-margin-bottom-1 u-margin-bottom-0@sm u-4@sm"><span class="u-bg-yellow u-padding-1 u-block u-text-th4">Detalle de cada iniciativa legislativa y parlamentaria</span></div>
            <div class="o-grid__col u-12 u-margin-bottom-1 u-margin-bottom-0@sm u-4@sm"><span class="u-bg-yellow u-padding-1 u-block u-text-th4">Análisis temático vinculado con calidad democrática, justicia social y desarrollo sostenible</span></div>
            <div class="o-grid__col u-12 u-margin-bottom-1 u-margin-bottom-0@sm u-4@sm"><span class="u-bg-yellow u-padding-1 u-block u-text-th4">Un novedoso sistema de alertas personalizadas</span></div>
          </div>
          <p>Toda esta información de la legislatura en curso la puedes encontrar en abierto y de manera gratuita en nuestra página web. Si necesitas más servicios sólo tienes que ponerte en contacto con el equipo de <a href="https://politicalwatch.es" target="_blank">Political Watch</a>. Esto es lo que podemos ofrecerte:</p>
          <div class="o-grid">
            <div class="o-grid__col u-12 u-margin-bottom-1 u-margin-bottom-0@sm u-4@sm"><span class="u-bg-primary u-padding-1 u-block u-text-th4">Temáticas personalizadas para su análisis</span></div>
            <div class="o-grid__col u-12 u-margin-bottom-1 u-margin-bottom-0@sm u-4@sm"><span class="u-bg-primary u-padding-1 u-block u-text-th4">Informes periódicos de la legislatura en curso</span></div>
            <div class="o-grid__col u-12 u-margin-bottom-1 u-margin-bottom-0@sm u-4@sm"><span class="u-bg-primary u-padding-1 u-block u-text-th4">Informes comparando diversas legislaturas</span></div>
            <div class="o-grid__col u-12 u-margin-bottom-1 u-margin-bottom-0@sm u-4@sm"><span class="u-bg-primary u-padding-1 u-block u-text-th4">Análisis de contexto político y social</span></div>
            <div class="o-grid__col u-12 u-margin-bottom-1 u-margin-bottom-0@sm u-4@sm"><span class="u-bg-primary u-padding-1 u-block u-text-th4">Alianzas estratégicas</span></div>
          </div>
          <p>Con toda esta información, el usuario podrá conocer de primera mano la actividad del Congreso de los Diputados y de sus representantes. Estamos convencidos que generar conocimiento y datos en torno a la actividad del Congreso de los Diputados aumenta la calidad del debate público y facilita y mejora los procesos de toma de decisión pública.</p>
          <p>Por eso sabemos que esta información puede resultar valiosa tanto para diputados o diputadas que preparan iniciativas, intervenciones y diversas actividades, así como para otros profesionales interesados por el ámbito parlamentario y su desarrollo.</p>
          <p>Cumplir con los valores de transparencia, accesibilidad y rendición de cuentas, así como generar conocimiento y datos en torno a temas fundamentales del ámbito público, contribuye a mejorar la calidad de la gobernanza y las políticas públicas. En definitiva, contribuye a mejorar la calidad de nuestra democracia.</p>
          <p>Y es que <a href="https://politicalwatch.es" target="_blank">Political Watch</a> identifica como uno de los grandes retos de nuestro tiempo mejorar nuestra democracia y adaptarla al siglo XXI. Por eso desde nuestro think tank trabajamos por generar conocimiento, datos y alianzas, a través del uso y desarrollo de tecnologías cívicas que permitan mejorar la calidad democrática y en definitiva la vida de las personas. En este sentido, el proyecto QHLD, con más de una década de vida y experiencia, es uno de nuestros grandes exponentes.</p>

          <div class="o-grid o-grid--center o-grid--no-gutters u-margin-top-4">
            <div class="o-grid__col u-12 u-8@sm">
              <span class="u-bg-yellow u-padding-1 u-block u-text-center u-text-th3">Contacta con nosotras en <a href="mailto:qhld@politicalwatch.es?subject=Contacto desde QHLD.es" target="_blank">qhld@politicalwatch.es</a></span>
            </div>
          </div>

        </div>
      </div>

      <!-- <ImageHeader :home="home" :image="getHomeImage()" class="u&#45;margin&#45;bottom&#45;4" /> -->

      <!-- <loader v&#45;if="!isLoaded" title="Cargando datos" subtitle="Puede llevar algun tiempo" /> -->
      <!--  -->
      <!-- <div class="o&#45;section c&#45;home__initiatives" v&#45;if="relatedInitiatives.length"> -->
      <!--   <h1 class="u&#45;uppercase c&#45;home__initiatives_title">Iniciativas relacionadas</h1> -->
      <!--   <a class="c&#45;home__more u&#45;border&#45;link u&#45;hide u&#45;block@sm u&#45;uppercase" :href="home.RelatedInitiativesSearch">Más iniciativas</a> -->
      <!-- </div> -->
      <!--  -->
      <!-- <results -->
      <!--   v&#45;if="relatedInitiatives.length" -->
      <!--   :initiatives="relatedInitiatives" -->
      <!--   :topicsStyles="topicsStyles" -->
      <!-- /> -->
      <!--  -->
      <!-- <a v&#45;if="relatedInitiatives.length" class="c&#45;home__more u&#45;hide@sm u&#45;border&#45;link u&#45;uppercase" :href="home.RelatedInitiativesSearch">Más iniciativas</a> -->
      <!--  -->
      <!-- <LastActivity :lastdays="lastdays" /> -->

    </div>
  </div>
</template>

<script>

  import Icon from '@/components/Icon.vue';
  import ImageHeader from '@/components/ImageHeader.vue';
  import LastActivity from '@/components/LastActivity.vue';
  import Loader from '@/components/Loader.vue';
  import Results from '@/components/Results.vue';
  import config from '@/config';
  import api from '@/api';

  export default {
      name: 'home',
      components: {
          Icon,
          ImageHeader,
          LastActivity,
          Loader,
          Results,
        },
      data: function() {
          return {
              isLoaded: false,
              home: {
                Date: 'Diciembre 2023',
                TitleDate: 'Ya tenemos comisiones',
                ImageUrl: 'https://www.congreso.es/es/fotonoticias?p_p_id=fotonoticias&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_fotonoticias_mvcPath=detalle&_fotonoticias_fotonId=4406',
                ImageAuthor: 'Congreso.es'
              },
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
                  api.getInitiative(id, false)
                    .then(initiative => {
                        this.relatedInitiatives.push(initiative)
                        this.isLoaded = true
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
          // this.getHome();
          // this.getLastdays();
        }
    }
</script>
