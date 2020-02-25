<template>
  <div>
    <div id="about" class="o-container o-section u-margin-bottom-10">
      <tipi-header title="Acerca"/>
      <div class="o-grid">
        <div class="o-grid__col u-8@sm u-offset-2@sm">
          <router-link class="c-button c-button--compact u-padding-left-0" :to="{name: 'about-en'}">Read this page in English</router-link>
          <p>Parlamento 2030 es una innovadora herramienta que rastrea, reúne y ofrece la información sobre la actividad del Congreso de los Diputados español relacionada con los Objetivos de Desarrollo Sostenible. Diseñada para superar los retos que plantea la naturaleza transversal de la Agenda 2030, Parlamento 2030 clasifica la información relacionada con los ODS gracias a un avanzado sistema automático de etiquetado masivo. Esta innovadora tecnología permite a los usuarios navegar por la actividad parlamentaria relacionada con los ODS a través de un buscador online, abierto y gratuito. La información ofrecida es esencial de cara a la monitorización y la rendición de cuentas de la implementación de la Agenda 2030 a nivel nacional.</p>
          <h4>¿Cómo funciona?</h4>
          <p>Parlamento 2030 reúne toda la información publicada por el Congreso de los Diputados y crea una base de datos a través de un proceso automático de etiquetado masivo que la clasifica de acuerdo a su relación con cualquier ODS o meta. Combina ciencia informática avanzada - necesaria para escrapear miles de PDFs en los que se publica la información parlamentaria y transformarlos en una base de datos estructurada - con el diseño de unos diccionarios de ODS que automáticamente relacionan iniciativas políticas con objetivos y las metas. Después, a través de un buscador intuitivo, atractivo y accesible, ofrece toda la información relevante en formatos reutilizables. Los usuarios pueden seleccionar sus propios términos en el buscador para adaptar las búsquedas a sus necesidades.</p>
          <h4>¿Qué respuestas ofrece?</h4>
          <p>Parlamento 2030 ayuda a encontrar las respuestas menos obvias a complicadas preguntas a primera vista: ¿Qué ODS se ven afectados por determinadas iniciativas parlamentarias? ¿Cuáles objetivos o metas reciben una mayor atención de los diputados y cuáles son los grandes olvidados? ¿Quiénes son los diputados más activos en la implementación de la Agenda 2030 y quiénes no están aportando nada? Además, ofrece un método de gran eficiencia para analizar la actividad política al permitir detectar toda la actividad parlamentaria relacionada con un determinado ODS o meta propuesta y debatida al mismo tiempo en diferentes comisiones del Congreso.</p>
          <h4>¿Por qué el Congreso de los Diputados?</h4>
          <p>Los parlamentos nacionales tienen una posición clave en el proceso de implementación de la Agenda 2030. Son la institución pública más relevante y mejor posicionada para asegurar la coherencia con el desarrollo sostenible en los cientos de miles de leyes, iniciativas legislativas, planes públicos y presupuestos que se aprobarán en cada país en los próximos años.</p>
          <h4>¿Puede adaptarse a otros países?</h4>
          <p>Sí, su adaptación es posible. La tecnología utilizada en Parlamento 2030 está actualmente adaptada al Congreso de los Diputados debido al interés del Gobierno español de incluir esta herramienta como parte de su Plan de Acción para la Implementación de la Agenda 2030, presentado ante Naciones Unidas en 2018. Al igual que ha sido adaptado al Parlamento español, también es posible hacerlo a los parlamentos de otros países o a otros niveles de la administración pública. Ya sea otro país, una región o el Parlamento Europeo quienes muestren interés, esta tecnología puede ser rápidamente adaptada en un corto periodo de tiempo a cualquiera de estos marcos debido al código abierto utilizado.</p>
          <h4>¿Quiénes somos?</h4>
          <p>Parlamento 2030 es un proyecto de <a href="http://politicalwatch.es" target="_blank">Political Watch</a>, la plataforma que se inscribe dentro de la estrategia del think tank <a href="http://ciecode.es" target="_blank">CIECODE</a> y que está formado por profesionales de distintas disciplinas como informáticos, periodistas y economistas. Nuestra misión es fomentar un debate público informado y basado en hechos sobre el desarrollo sostenible. Desarrollamos tecnologías innovadoras que automáticamente rastrean actividad relacionada con el desarrollo sostenible y que ofrecen acceso a esta información de forma pública, directa y gratuita a actores clave y ciudadanos.</p>
          <h4>¿De dónde venimos?</h4>
          <p>Parlamento 2030 es una adaptación de TiPi, una herramienta digital implementada en España desde 2015, que monitoriza toda la actividad parlamentaria de 21 temáticas relacionadas con la lucha contra la pobreza y la desigualdad. TiPi (que responde a las siglas de Transparencia + Información + Participación + Influencia) es otro innovador proyecto de Political Watch que genera datos abiertos y fomenta la transparencia, el acceso a información y la rendición de cuentas política a través de la monitorización parlamentaria de las 21 temáticas estratégicamente seleccionadas, a través del mismo avanzado sistema de escrapeo y etiquetado utilizado en Parlamento 2030.</p>
          <div class="u-text-center">
            <router-link class="c-button c-button--primary" :to="{name: 'mediakit'}">Visita nuestro Mediakit</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { TipiHeader } from 'tipi-uikit';

export default {
  name: 'about',
  components: {
    TipiHeader,
  },
}
</script>

<style scoped lang="scss">
</style>
