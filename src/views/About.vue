<template>
  <div>
    <div id="about" class="o-container o-section u-margin-bottom-10">
      <div class="o-grid">
        <div class="o-grid__col u-4">
          <page-header title="Acerca"/>
        </div>
        <div class="o-grid__col u-8">
          <h3>Acortando distancias entre la ciudadanía y sus representantes políticos en el congreso de los diputados de España desde 2011.</h3>
          <h6>Orígenes</h6>
          <p>Qué Hacen Los Diputados (QHLD) es un proyecto que nace en 2011 de la mano de un equipo multidisciplinar de desarrolladores y periodistas. En sus inicios, la motivación del proyecto era “ayudar a saber qué hacen los actuales representantes políticos'' brindando información a la ciudadanía de manera sencilla para que “pudieran implicarse en el proceso legislativo”. Sin embargo, el proyecto quedó inactivo en 2018 debido a otros compromisos de su equipo promotor.</p>
          <h6>Renovación de QHLD</h6>
          <p>A principios de 2021, Political Watch se reunió con sus fundadoras para ofrecerse a la reactivación de QHLD. El alineamiento resultó inmediato, ya que desde nuestro think-and-do tank también hemos trabajado por más de 10 años herramientas de seguimiento parlamentario como Proyecto Avizor, TIPI Ciudadano o Parlamento 2030. En dicha reunión se cedieron los derechos y el nombre del proyecto a Political Watch, que a su vez decidió unificar toda la experiencia del proyecto previo a las innovaciones realizadas en sus herramientas de seguimiento parlamentario y así lanzar esta nueva plataforma mejorada de QHLD. La misma contiene lo mejor de sus versiones previas y muchas funcionalidades más para cumplir con sus objetivos de promoción de la rendición de cuentas del parlamento y sus parlamentarios y con ella acortando las distancias entre la ciudadanía y sus representantes políticos.</p>
          <h6>Motivaciones</h6>
          <p>El proyecto pretende responder a una serie de cuestionamientos en relación con el trabajo de las y los diputados en el Congreso:</p>
          <ul>
            <li>¿Cómo votan las y los diputados?</li>
            <li>¿Qué se está haciendo en relación con el control y la orientación al Gobierno?</li>
            <li>¿Qué leyes se están debatiendo en este momento?</li>
            <li>¿Qué tipos de iniciativas son las más comunes?</li>
            <li>¿Cómo contribuyen las iniciativas en marcha a luchar contra las problemáticas sociales, económicas y medioambientales?</li>
            <li>¿Quiénes son las y los diputados más activos o influyentes en diferentes políticas?</li>
            <li>¿Cuáles son las políticas más impulsadas por cada grupo parlamentario?</li>
            <li>¿Cómo se están tratando ciertos temas en la Cámara?</li>
          </ul>
          <h6>Objetivos</h6>
          <ul>
            <li>Potenciar la relación existente entre los representados y sus representantes a través del control ciudadano y la rendición de cuentas.</li>
            <li>Ofrecer una herramienta de acceso libre y gratuito que ofrezca información relativa a la actividad parlamentaria y a la labor de las y los diputados del Congreso para realizar el seguimiento de su actividad de manera fácil e intuitiva.</li>
            <li>Recopilar datos acerca de la labor de los y las diputadas del Congreso y ofrecerlos para su reutilización por parte de las organizaciones de la sociedad civil, medios de comunicación, centros de investigación, ciudadanía, etc.</li>
            <li>Procesar la información recopilada y elaborar análisis, informes y artículos de actualidad parlamentaria, respondiendo al qué se hace, cómo se hace y por qué se hace.</li>
          </ul>
          <h6>Tecnología</h6>
          <p>La tecnología de QHLD escanea toda la actividad parlamentaria del Congreso de España y la clasifica automáticamente según su relación con alguna de las 24 políticas prioritarias para la pobreza, la justicia social y el desarrollo sostenible y con alguno de los 17 Objetivos de Desarrollo Sostenible de las Naciones Unidas. Todas estas áreas temáticas han sido diseñadas junto con personas y organizaciones expertas en cada una de ellas.</p>
          <p>La plataforma digital dispone de un buscador con el que la persona usuaria puede afinar su búsqueda en base a múltiples criterios (autor, fecha, tema, palabra clave, etc.).</p>
          <p>Además ofrece un sistema personalizado de alertas que permite a la persona usuaria estar al día sobre las novedades parlamentarias de sus políticas de interés.</p>
          <p>Finalmente permite el acceso y descarga libre de toda la información disponible a través de la misma web en formato reutilizable Excel/CSV o a través de su <a href="https://api.quehacenlosdiputados.es">API</a> en formato JSON.</p>
          <p>Todo el código informático del proyecto está disponible en <a href="https://github.com/politicalwatch/">la página de Github de Political Watch</a>.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import PageHeader from '@/components/PageHeader';

export default {
  name: 'about',
  components: {
    PageHeader,
  },
}
</script>

<style scoped lang="scss">
</style>
