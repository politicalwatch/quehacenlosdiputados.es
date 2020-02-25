<template>
  <div class="initiativechart">
    <D3SlicesChart :config="config" :datum="datum" :height="400"></D3SlicesChart>
  </div>
</template>


<script>
import { D3SlicesChart } from 'tipi-uikit';

export default {
  name: 'InitiativeChart',
  components: {
    D3SlicesChart,
  },
  data() {
    return {
      config: {
        key: 'name',
        value: 'value',
        color: {key: 'color', default: '#CCC'},
        radius: {outter: 150, inner: 87, padding: 0.05, round: 0},
        transition: {duration: 200},
      },
      odsColors: {
        'ODS 1 - Fin de la Pobreza': '#E5243C',
        'ODS 2 - Hambre Cero': '#DDA839',
        'ODS 3 - Salud y bienestar': '#4C9F38',
        'ODS 4 - Educación de calidad': '#C51A2D',
        'ODS 5 - Igualdad de género': '#F93A22',
        'ODS 6 - Agua limpia y saneamiento': '#2CBDE2',
        'ODS 7 - Energía asequible y no contaminante': '#FCC30A',
        'ODS 8 - Trabajo decente y crecimiento económico': '#A21943',
        'ODS 9 - Industrial, innovación e infraestructura': '#FA6926',
        'ODS 10 - Reducción de las desigualdades': '#DD1267',
        'ODS 11 - Ciudades y comunidades sostenibles': '#FB9E23',
        'ODS 12 - Producción y consumo responsables': '#BF8C2E',
        'ODS 13 - Acción por el clima': '#3F7D44',
        'ODS 14 - Vida submarina': '#1D97D9',
        'ODS 15 - Vida de ecosistemas terrestres': '#56C029',
        'ODS 16 - Paz, justicia e instituciones sólidas': '#10699D',
        'ODS 17 - Alianzas para lograr los objetivos': '#021D8D',
      },
    };
  },
  props: {
    initiative: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    topics: {
      type: Array,
      required: true,
      default: () => ([]),
    },
  },
  computed: {
    datum() {
      const datum = [];
      Object.keys(this.odsColors).forEach((k) => {
        const obj = { name: k, color: this.odsColors[k] };
        obj.value = this.initiative.topics.indexOf(k) >= 0 ? 1 : 0;
        datum.push(obj);
      });
      return datum;
    },
  },
  created() {
    console.log('created');
    console.log('datum', this.datum);
  },
};
</script>

<style lang="scss">
.initiativechart {
  max-width: 300px;
  display: block;
  margin: 0 auto;
}
</style>