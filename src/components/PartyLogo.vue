<template>
  <div class="c-party_logo__container">
    <img
      class="c-party_logo__image"
      :src="getLogoSrc()"
      :alt="'Logo de ' + party"
    />
  </div>
</template>

<script>
export default {
  name: "PartyLogo",
  data: function () {
    return {
      logos: {
        Vox: "vox.png",
        "¡Teruel Existe!": "teruelexiste.svg",
        UPN: "upn.jpg",
        UP: "unidaspodemos.png",
        "PsdeG-PSOE": "psoe.png",
        PSOE: "psoe.png",
        "PSE-EE-PSOE": "pse-ee.png",
        "PSC-PSOE": "psc.png",
        PRC: "prc.png",
        "PP - FORO": "pp.png",
        PP: "pp.png",
        PDeCAT: "pdecat.png",
        "NC-CCa-PNC": "nueva_canarias.png",
        "MÉS COMPROMÍS": "compromis.jpg",
        "MÁS PAÍS-EQUO": "mas-pais.jpg",
        "JxCat-JUNTS": "jxcat.png",
        IU: "iu.png",
        FAC: "fac.png",
        ERC: "erc.png",
        "ERC-S": "erc.png",
        "EH Bildu": "bildu.png",
        "ECP-GUAYEM EL CANVI": "encomupodem.jpg",
        "EC-UP": "podemos.jpg",
        PODEMOS: "podemos.jpg",
        "EAJ-PNV": "eajpnv.png",
        Cs: "ciudadanos.png",
        "CUP-PR": "cup.png",
        CCa: "ca.jpeg",
        "CCa-NC": "ca.jpeg",
        BNG: "bng.png",
      },
    };
  },
  props: {
    party: String,
  },
  methods: {
    getLogoSrc: function () {
      let logo = "";
      if (this.party in this.logos) {
        logo = new URL(
          `@/assets/party_logos/${this.logos[this.party]}`,
          import.meta.url
        ).href;
      }
      return logo;
    },
  },
};
</script>

<style scoped lang="scss"></style>
