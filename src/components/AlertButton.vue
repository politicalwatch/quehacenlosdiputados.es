<template>
  <a class="c-save-alert__button u-border-link u-uppercase" href="#" @click.prevent="saveAlert"><icon icon="bell" /> Crea una alerta</a>
</template>

<script>
import swal from 'sweetalert2';
import api from '@/api';
import Icon from './Icon';


export default {
  name: "AlertButton",
  props: {
    searchparams: Object,
  },
  components: {
    Icon,
  },
  methods: {
    saveAlert: async function() {
      let search_params = Object.assign({}, this.searchparams);
      if (search_params.hasOwnProperty('page')) delete search_params.page;

      if (!search_params.hasOwnProperty('knowledgebase')) search_params['knowledgebase'] = 'politicas';

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

