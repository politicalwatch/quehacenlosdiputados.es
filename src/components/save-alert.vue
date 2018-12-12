<template>
  <a href="#" @click.prevent="saveAlert">
    <i class="fa fa fa-save"></i> Guardar búsqueda
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
        input: 'email',
        inputPlaceholder: 'nombre@dominio.com',
        imageUrl: 'http://www.newdesignfile.com/postpic/2014/10/send-email-message-icon_173882.png',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
        animation: false,
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
              type: 'success'
            });

          })
          .catch(error => {
            this.errors = error;
            swal({
              title: 'Error al guardar la búsqueda',
              text: 'Inténtalo de nuevo más tarde',
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

