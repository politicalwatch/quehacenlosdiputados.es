<template>
  <div class="c-save-alert o-container u-margin-top-4">
    <div class="o-grid o-grid--center">
      <div class="c-save-alert__wrapper o-grid__col u-12 u-6@sm">
        <div class="c-save-alert__image">
          <img src="/img/alerts.png" />
        </div>
        <h4 class="u-uppercase">No te pierdas nada con la actividad parlamentaria relacionada con</h4>
        <h1>{{ text }}</h1>
        <a class="c-save-alert__button u-border-link u-uppercase" href="#" @click.prevent="saveAlert"><icon icon="bell" /> Crea una alerta</a>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2';
import api from '@/api';
import Icon from './Icon';


export default {
  name: "SaveAlert",
  props: {
    searchparams: Object,
    text: String,
  },
  components: {
    Icon,
  },
  methods: {
    saveAlert: async function() {
      let search_params = Object.assign({}, this.searchparams);
      if (search_params.hasOwnProperty('page')) delete search_params.page;

      // ensure some params are array
      if (search_params.hasOwnProperty('subtopic'))
        search_params.subtopics = search_params.subtopics.constructor !== Array ?
          [search_params.subtopics] :
          search_params.subtopics;
      if (search_params.hasOwnProperty('tags'))
        search_params.tags = search_params.tags.constructor !== Array ?
          [search_params.tags] :
          search_params.tags;

      const {value: email} = await swal({
        title: 'Crea una alerta personalizada',
        text: 'Te enviaremos un correo electrónico cada vez que haya alguna novedad en el Congreso de los Diputados relacionada con los criterios seleccionados',
        input: 'email',
        inputPlaceholder: 'nombre@dominio.com',
        imageUrl: '/img/email-alert-icon.svg',
        imageWidth: 64,
        imageHeight: 56,
        imageAlt: 'Imagen de correo electrónico',
        animation: false,
        focusConfirm: false,
        confirmButtonText: 'Crear',
        confirmButtonAriaLabel: 'Crear',
      });
      if (email) {
        let params = {
          email: email,
          search: JSON.stringify(search_params)
        }
        api.saveAlert(params)
          .then(() => {
            swal({
              title: 'Alerta creada',
              text: 'Recibirá en breve un correo de confirmación',
              focusConfirm: false,
              type: 'success'
            });

          })
          .catch(error => {
            this.errors = error.response;
            const limited = error.response.status === 429;
            swal({
              title: limited ? 'Limite excedido por hora' : 'Error al crear la alerta',
              text: 'Inténtalo de nuevo más tarde',
              focusConfirm: false,
              type: 'error'
            });
          });
      }
    }

  }
}
</script>

<style scoped lang="scss">
</style>

