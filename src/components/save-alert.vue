<template>
  <a class="c-button c-button--compact c-button--primary c-button--icon-right" href="#" @click.prevent="saveAlert">
    Recibe alertas <tipi-icon class="c-icon--white" icon="bell" />
  </a>
</template>

<script>
import swal from 'sweetalert2';
import api from '@/api';
import { TipiIcon } from 'tipi-uikit';


export default {
  name: "save-alert",
  props: [
    'searchparams'
  ],
  components: {
    TipiIcon,
  },
  methods: {
    saveAlert: async function() {
      let search_params = Object.assign({}, this.searchparams);
      delete search_params.page;

      // ensure some params are array
      search_params.subtopics = search_params.subtopics.constructor !== Array ?
        [search_params.subtopics] :
        search_params.subtopics;
      search_params.tags = search_params.tags.constructor !== Array ?
        [search_params.tags] :
        search_params.tags;

      const {value: email} = await swal({
        title: 'Introduce tu correo electrónico',
        text: 'A esta dirección de correo te enviaremos alertas cada vez que haya una novedad en el Congreso de los Diputados dentro de los parámetros que has seleccionado',
        input: 'email',
        inputPlaceholder: 'nombre@dominio.com',
        imageUrl: '/img/email-alert-icon.svg',
        imageWidth: 64,
        imageHeight: 56,
        imageAlt: 'Imagen de correo electrónico',
        animation: false,
        focusConfirm: false,
        confirmButtonText: 'Guardar',
        confirmButtonAriaLabel: 'Guardar',
      });
      if (email) {
        let params = {
          email: email,
          search: JSON.stringify(search_params)
        }
        api.saveAlert(params)
          .then(() => {
            swal({
              title: 'Alerta guardada!',
              text: 'Recibirá en breve un correo de confirmación',
              focusConfirm: false,
              type: 'success'
            });

          })
          .catch(error => {
            this.errors = error.response;
            const limited = error.response.status === 429;
            swal({
              title: limited ? 'Limite excedido por hora' : 'Error al guardar la búsqueda',
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

