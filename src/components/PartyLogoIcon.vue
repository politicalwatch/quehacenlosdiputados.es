<template>
  <div
    v-if="this.parties[this.party]"
    class="c-party_logo_icon"
    :style="getBackground"
  >
    <figure class="c-party_logo_icon__image" :alt="'Logo de ' + getName">
      <component :is="svg"></component>
    </figure>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "PartyLogoIcon",
  props: {
    party: String,
  },
  data: function () {
    return {
      parties: {
        Cs: {
          name: "Ciudadanos",
          logo: "cs",
          color: "#ff4f00",
        },
        VOX: {
          name: "VOX",
          logo: "vox",
          color: "#5ac035",
        },
        ERC: {
          name: "Esquerra Republicana",
          logo: "erc",
          color: "#ffbf41",
        },
        "ERC-S": {
          name: "Esquerra Republicana",
          logo: "erc",
          color: "#ffbf41",
        },
        PP: {
          name: "Partido Popular",
          logo: "pp",
          color: "#0056a3",
        },
        "PP - FORO": {
          name: "Partido Popular",
          logo: "pp",
          color: "#0056a3",
        },
        "MÉS COMPROMÍS": {
          name: "Compromís",
          logo: "compromis",
          color:
            "linear-gradient(204deg, #f29127 100%, #ec8427 80%, #de6527 42%, #d13b27 3%)",
        },
        "MÁS PAÍS-EQUO": {
          name: "Más País",
          logo: "maspais",
          color: "#0a7565",
        },
        PDeCAT: {
          name: "Partit Demòcrata",
          logo: "pdecat",
          color: "#114488",
        },
        "JxCAT-JUNTS": {
          name: "Junts per Catalunya",
          logo: "jxcat",
          color: "#40e0d0",
        },
        "JxCat-JUNTS (Junts)": {
          name: "Junts per Catalunya",
          logo: "jxcat",
          color: "#40e0d0",
        },
        BNG: {
          name: "Bloque Nacionalista Galego",
          logo: "bng",
          color: "#76b3dd",
        },
        SUMAR: {
          name: "SUMAR",
          logo: "sumar",
          color: "#e51c55",
        },
        UP: {
          name: "Unidas Podemos",
          logo: "unidaspodemos",
          color: "#ffffff",
        },
        "EC-UP": {
          name: "Podemos",
          logo: "podemos",
          color: "#6b1f5f",
        },
        IU: {
          name: "Izquierda Unida",
          logo: "iu",
          color: "#b1132f",
        },
        "ECP-GUAYEM EL CANVI": {
          name: "En Comú Podem",
          logo: "encomu",
          color: "linear-gradient(135deg, #dc2a15 15%, #6d2d5c 85%)",
        },
        CCa: {
          name: "Coalición Canaria",
          logo: "coalicioncanaria",
          color: "#02abd6",
        },
        "CCa-NC": {
          name: "Coalición Canaria",
          logo: "coalicioncanaria",
          color: "#02abd6",
        },
        "NC-CCa-PNC": {
          name: "Nueva Canaria",
          logo: "nuevacanaria",
          color: "#81c045",
        },
        "CUP-PR": {
          name: "Candidatura d'Unitat Popular",
          logo: "cup",
          color: "#fff200",
        },
        UPN: {
          name: "Unión del Pueblo Navarro",
          logo: "upn",
          color: "#0856b3",
        },
        "¡Teruel Existe!": {
          name: "Teruel Existe",
          logo: "teruelexiste",
          color: "#227e57",
        },
        FAC: {
          name: "Foro Asturias",
          logo: "foroasturias",
          color: "#19375b",
        },
        PRC: {
          name: "Partido Regionalista de Cantabria",
          logo: "prc",
          color: "#bfcd16",
        },
        PSOE: {
          name: "Partido Socialista Obrero Español",
          logo: "psoe",
          color: "#e30613",
        },
        "PSC-PSOE": {
          name: "Partido Socialista Obrero Español",
          logo: "psoe",
          color: "#e30613",
        },
        "PSE-EE-PSOE": {
          name: "Partido Socialista Obrero Español",
          logo: "psoe",
          color: "#e30613",
        },
        "PsdeG-PSOE": {
          name: "Partido Socialista Obrero Español",
          logo: "psoe",
          color: "#e30613",
        },
        "EAJ-PNV": {
          name: "Partido Nacionalista Vasco",
          logo: "pnv",
          color: "linear-gradient(135deg, #dc2a15 15%, #6d2d5c 85%)",
        },
        "EH Bildu": {
          name: "Euskal Herria Bildu",
          logo: "ehbildu",
          color: "#b4cc16",
        },
      },
    };
  },
  computed: {
    svg() {
      let svg = "";
      try {
        svg = defineAsyncComponent(() =>
          import(
            `@/assets/party_logos/icon/${this.parties[this.party].logo}.svg`
          )
        );
      } catch (error) {
        svg = this.icon;
      }
      return svg;
    },
    getBackground: function () {
      const bg = this.parties[this.party]?.color
        ? this.parties[this.party].color
        : "";
      if (bg.length == 7) {
        return "background-color:" + bg;
      }
      return "background-image:" + bg;
    },
    getName: function () {
      return this.parties[this.party]?.name
        ? this.parties[this.party].name
        : "";
    },
  },
};
</script>

<style scoped lang="scss">
.c-party_logo_icon__image {
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 65%;
  }
}
</style>
