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
                    <select-box name="dicts" placeholder="Todos" :options="topics"></select-box>
                  </div>
                  <label for="terms" class="col-sm-1 control-label">Términos</label>
                  <div class="col-sm-7">
                    <select-box name="test" id="idtest" :options="['lorem', 'ipsum']"></select-box>
                  </div>
                </div>
                <div class="form-group">
                  <label for="grupootro" class="col-sm-1 control-label">Autor</label>
                  <div class="col-sm-3">
                    <select-box name="grupootro" placeholder="Todos" :options="[
                      'Gobierno',
                      'Grupo Popular',
                      'Grupo Socialista',
                      'Grupo Confederal de Unidos Podemos-En Comú Podem-En Mare',
                      'Grupo Ciudadanos',
                      'Grupo Vasco - EAJ PNV',
                      'Grupo Esquerra Republicana',
                      'Grupo Mixto'
                    ]"></select-box>
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
                      <select-box name="lugar" placeholder="Cualquiera" :options="[
                        'Pleno',
                        'Comisión Constitucional',
                        'Comisión de Asuntos Exteriores',
                        'Comisión de Justicia',
                        'Comisión de Interior',
                        'Comisión de Defensa',
                        'Comisión de Economía y Competitividad',
                        'Comisión de Hacienda y Administraciones Públicas',
                        'Comisión de Presupuestos',
                        'Comisión de Fomento',
                        'Comisión de Educación y Deporte',
                        'Comisión de Empleo y Seguridad Social',
                        'Comisión de Industria, Energía y Turismo',
                        'Comisión de Agricultura, Alimentación y Medio Ambiente',
                        'Comisión de Sanidad y Servicios Sociales',
                        'Comisión de Cooperación Internacional para el Desarrollo',
                        'Comisión de Cultura',
                        'Comisión de Igualdad',
                        'Comisión de Reglamento',
                        'Comisión del Estatuto de los Diputados',
                        'Comisión de Peticiones',
                        'Comisión de Seguimiento y Evaluación de los Acuerdos Pacto de Toledo',
                        'Comisión sobre Seguridad Vial y Movilidad Sostenible',
                        'Comisión para las Políticas Integrales de la Discapacidad',
                        'Comisión para el Estudio del Cambio Climático',
                        'Comisión de Derechos de la Infancia y Adolescencia',
                        'C. calidad democrática, contra corrupción y reformas inst. y legales'
                      ]"></select-box>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="ref" class="col-sm-1 control-label">Referencia</label>
                    <div class="col-sm-3">
                      <input class="form-control" type="text" id="ref" name="ref" placeholder="Ej.: 121/000001">
                    </div>
                    <label for="vtipo" class="col-sm-1 control-label">Tipo</label>
                    <div class="col-sm-7">
                      <select-box name="vtipo" placeholder="Cualquiera" :options="[
                        'Comparecencias',
                        'Convenios internacionales',
                        'Creación de comisiones, subcomisiones y ponencias',
                        'Interpelación y su respuesta',
                        'Moción consecuencia de interpelación y sus enmiendas',
                        'Planes, programas y dictámenes',
                        'Pregunta oral y su respuesta',
                        'Pregunta para respuesta escrita y su respuesta',
                        'Proposición de ley y sus enmiendas',
                        'Proposición no de ley y sus enmiendas',
                        'Proyecto de Ley y sus enmiendas',
                        'Real decreto legislativo',
                        'Real decreto-ley',
                        'Otros actos y sus enmiendas'
                      ]"></select-box>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="tramitacion" class="col-sm-1 control-label">Estado</label>
                    <div class="col-sm-3">
                      <select-box name="tramitacion" placeholder="Cualquiera" :options="[
                        { value: 'aprobada', name: 'Aprobada' },
                        { value: 'respondida', name: 'Respondida' },
                        { value: 'celebrada', name: 'Celebrada' },
                        { value: 'tramitacion', name: 'En tramitación' },
                        { value: 'rechazada', name: 'Rechazada' },
                        { value: 'retirada', name: 'Retirada' },
                        { value: 'noadmitida', name: 'No admitida a trámite' },
                        { value: 'nodebatida', name: 'No debatida' },
                        { value: 'convertida', name: 'Convertida en otra' },
                        { value: 'acumulada', name: 'Acumulada en otra' }
                      ]"></select-box>
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
import SelectBox from '@/components/select-box';
import api from '@/api'

export default {
  name: 'search',
  components: {
    PageHeader,
    SelectBox
  },
  data() {
    return {
      topics: [],
      errors: []
    }
  },
  methods: {
    getTopics() {
      api.getTopics()
        .then(topics => this.topics = topics)
        .catch(error => this.errors = error);
    }
  },
  created() {
    this.getTopics();
  }
}
</script>

<style scoped lang="scss">
</style>
