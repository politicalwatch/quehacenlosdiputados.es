<template>
  <div id="search">
    <page-header :title="'Search'"></page-header>
    <div class="container page">
      <div class="row">
        <div class="col-sm-12">
          <div class="well">
            <form class="form-horizontal" role="form">
              <fieldset>
                <div class="form-group">
                  <label for="dicts" class="col-sm-1 control-label">Tema</label>
                  <div class="col-sm-3">
                    <select class="form-control" id="dicts" name="dicts">
                      <option value="">Todos</option>
                      <option v-for="topic in topics" v-bind:key="topic.name" :value="topic.name" v-text="topic.name"></option>
                    </select>
                  </div>
                  <label for="terms" class="col-sm-1 control-label">Términos</label>
                  <div class="col-sm-7">
                  </div>
                </div>
                <div class="form-group">
                  <label for="grupootro" class="col-sm-1 control-label">Autor</label>
                  <div class="col-sm-3">
                    <select class="form-control" id="grupootro" name="grupootro">
                      <option value="">Todos</option>
                      <option value="Gobierno">Gobierno</option>
                      <option value="Grupo Popular">Grupo Popular</option>
                      <option value="Grupo Socialista">Grupo Socialista</option>
                      <option value="Grupo Confederal de Unidos Podemos-En Comú Podem-En Mare">Grupo Confederal de Unidos Podemos-En Comú Podem-En Mare</option>
                      <option value="Grupo Ciudadanos">Grupo Ciudadanos</option>
                      <option value="Grupo Vasco - EAJ PNV">Grupo Vasco - EAJ PNV</option>
                      <option value="Grupo Esquerra Republicana">Grupo Esquerra Republicana</option>
                      <option value="Grupo Mixto">Grupo Mixto</option>
                    </select>
                  </div>
                  <label for="autor" class="col-sm-1 control-label">Diputado/a</label>
                  <div class="col-sm-7">
                    <input type="text" id="autor" name="autor" class="form-control" placeholder="Apellidos, Nombre">
                  </div>
                </div>
                <div class="adv-search-block" style="display: block;">
                  <div class="form-group">
                    <label for="fechadesde" class="col-sm-1 control-label">Desde</label>
                    <div class="col-sm-3">
                      <input class="form-control" type="text" id="fechadesde" name="fechadesde" placeholder="dd/mm/YYYY">
                    </div>
                    <label for="fechahasta" class="col-sm-1 control-label">Hasta</label>
                    <div class="col-sm-3">
                      <input class="form-control" type="text" id="fechahasta" name="fechahasta" placeholder="dd/mm/YYYY">
                    </div>
                    <label for="lugar" class="col-sm-1 control-label">Lugar</label>
                    <div class="col-sm-3">
                      <select class="form-control" id="lugar" name="lugar">
                        <option value="">Cualquiera</option>
                        <option value="Pleno">Pleno</option>
                        <option value="Comisión Constitucional">Comisión Constitucional</option>
                        <option value="Comisión de Asuntos Exteriores">Comisión de Asuntos Exteriores</option>
                        <option value="Comisión de Justicia">Comisión de Justicia</option>
                        <option value="Comisión de Interior">Comisión de Interior</option>
                        <option value="Comisión de Defensa">Comisión de Defensa</option>
                        <option value="Comisión de Economía y Competitividad">Comisión de Economía y Competitividad</option>
                        <option value="Comisión de Hacienda y Administraciones Públicas">Comisión de Hacienda y Administraciones Públicas</option>
                        <option value="Comisión de Presupuestos">Comisión de Presupuestos</option>
                        <option value="Comisión de Fomento">Comisión de Fomento</option>
                        <option value="Comisión de Educación y Deporte">Comisión de Educación y Deporte</option>
                        <option value="Comisión de Empleo y Seguridad Social">Comisión de Empleo y Seguridad Social</option>
                        <option value="Comisión de Industria, Energía y Turismo">Comisión de Industria, Energía y Turismo</option>
                        <option value="Comisión de Agricultura, Alimentación y Medio Ambiente">Comisión de Agricultura, Alimentación y Medio Ambiente</option>
                        <option value="Comisión de Sanidad y Servicios Sociales">Comisión de Sanidad y Servicios Sociales</option>
                        <option value="Comisión de Cooperación Internacional para el Desarrollo">Comisión de Cooperación Internacional para el Desarrollo</option>
                        <option value="Comisión de Cultura">Comisión de Cultura</option>
                        <option value="Comisión de Igualdad">Comisión de Igualdad</option>
                        <option value="Comisión de Reglamento">Comisión de Reglamento</option>
                        <option value="Comisión del Estatuto de los Diputados">Comisión del Estatuto de los Diputados</option>
                        <option value="Comisión de Peticiones">Comisión de Peticiones</option>
                        <option value="Comisión de Seguimiento y Evaluación de los Acuerdos Pacto de Toledo">Comisión de Seguimiento y Evaluación de los Acuerdos Pacto de Toledo</option>
                        <option value="Comisión sobre Seguridad Vial y Movilidad Sostenible">Comisión sobre Seguridad Vial y Movilidad Sostenible</option>
                        <option value="Comisión para las Políticas Integrales de la Discapacidad">Comisión para las Políticas Integrales de la Discapacidad</option>
                        <option value="Comisión para el Estudio del Cambio Climático">Comisión para el Estudio del Cambio Climático</option>
                        <option value="Comisión de Derechos de la Infancia y Adolescencia">Comisión de Derechos de la Infancia y Adolescencia</option>
                        <option value="C. calidad democrática, contra corrupción y reformas inst. y legales">C. calidad democrática, contra corrupción y reformas inst. y legales</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="ref" class="col-sm-1 control-label">Referencia</label>
                    <div class="col-sm-3">
                      <input class="form-control" type="text" id="ref" name="ref" placeholder="Ej.: 121/000001">
                    </div>
                    <label for="vtipo" class="col-sm-1 control-label">Tipo</label>
                    <div class="col-sm-7">
                      <select class="form-control" name="vtipo" id="vtipo">
                        <option value="">Cualquiera</option>
                        <option value="Comparecencias">Comparecencias</option>
                        <option value="Convenios internacionales">Convenios internacionales</option>
                        <option value="Creación de comisiones, subcomisiones y ponencias">Creación de comisiones, subcomisiones y ponencias</option>
                        <option value="Interpelación y su respuesta">Interpelación y su respuesta</option>
                        <option value="Moción consecuencia de interpelación y sus enmiendas">Moción consecuencia de interpelación y sus enmiendas</option>
                        <option value="Planes, programas y dictámenes">Planes, programas y dictámenes</option>
                        <option value="Pregunta oral y su respuesta">Pregunta oral y su respuesta</option>
                        <option value="Pregunta para respuesta escrita y su respuesta">Pregunta para respuesta escrita y su respuesta</option>
                        <option value="Proposición de ley y sus enmiendas">Proposición de ley y sus enmiendas</option>
                        <option value="Proposición no de ley y sus enmiendas">Proposición no de ley y sus enmiendas</option>
                        <option value="Proyecto de Ley y sus enmiendas">Proyecto de Ley y sus enmiendas</option>
                        <option value="Real decreto legislativo">Real decreto legislativo</option>
                        <option value="Real decreto-ley">Real decreto-ley</option>
                        <option value="Otros actos y sus enmiendas">Otros actos y sus enmiendas</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="tramitacion" class="col-sm-1 control-label">Estado</label>
                    <div class="col-sm-3">
                      <select class="form-control" name="tramitacion" id="tramitacion">
                        <option value="">Cualquiera</option>
                        <option value="aprobada">Aprobada</option>
                        <option value="respondida">Respondida</option>
                        <option value="celebrada">Celebrada</option>
                        <option value="tramitacion">En tramitación</option>
                        <option value="rechazada">Rechazada</option>
                        <option value="retirada">Retirada</option>
                        <option value="noadmitida">No admitida a trámite</option>
                        <option value="nodebatida">No debatida</option>
                        <option value="convertida">Convertida en otra</option>
                        <option value="acumulada">Acumulada en otra</option>
                      </select>
                    </div>
                    <label for="titulo" class="col-sm-1 control-label">Título</label>
                    <div class="col-sm-7">
                      <input class="form-control" type="text" id="titulo" name="titulo" placeholder="Nota: Se admiten expresiones regulares">
                    </div>
                  </div>
                  <div class="form-group">
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-12 pull-right">
                    <button class="btn btn-primary pull-right" type="submit">Iniciar la búsqueda</button>
                    <br>
                    <a href="#" class="adv-search-link show-block" style="display: none;">
                      <i class="fa fa-caret-square-o-down"></i>
                      Mostrar búsqueda avanzada
                    </a>
                    <a href="#" class="adv-search-link hide-block" style="display: inline;">
                      <i class="fa fa-caret-square-o-up"></i>
                      Ocultar búsqueda avanzada
                    </a>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 text-center">
          <p class="well"><i class="fa fa-lightbulb-o"></i> Tip: <strong>Los nombres de l@s diputad@s se autocompletan. Introduce una letra y verás.</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/page-header';
import { apiClient } from '../main'

export default {
  name: 'search',
  components: {
    PageHeader
  },
  data() {
    return {
      topics: [],
      errors: []
    }
  },
  methods: {
    getTopics() {
      apiClient.get("/topics/")
        .then(response => {
          this.topics = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  },
  created() {
    this.getTopics()
  }
}
</script>

<style scoped lang="scss">
</style>
