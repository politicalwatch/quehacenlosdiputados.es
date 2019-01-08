<template>
  <a href="#" @click.prevent="saveAlert">
    <i class="fa fa fa-envelope"></i> Recibe alertas
  </a>
</template>

<script>
import swal from 'sweetalert2';
import api from '@/api';

export default {
  name: "save-alert",
  props: [
    'searchparams'
  ],
  methods: {
    saveAlert: async function() {
      let search_params = Object.assign({}, this.searchparams);
      delete search_params.page;
      const {value: email} = await swal({
        title: 'Introduce tu correo electrónico',
        text: 'A esta dirección de correo te enviaremos alertas cada vez que haya una novedad en el Congreso de los Diputados dentro de los parámetros que has seleccionado',
        input: 'email',
        inputPlaceholder: 'nombre@dominio.com',
        imageUrl: 'http://www.newdesignfile.com/postpic/2014/10/send-email-message-icon_173882.png',
        imageWidth: 200,
        imageHeight: 200,
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
            this.errors = error;
            swal({
              title: 'Error al guardar la búsqueda',
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

