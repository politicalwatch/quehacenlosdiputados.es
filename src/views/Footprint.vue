<template>
  <div>
    <div id="footprint" class="o-container o-section u-margin-bottom-10">
      <div class="o-grid">
        <div class="o-grid__col u-12 u-4@sm">
          <page-header title="Huella parlamentaria"/>
        </div>
        <div class="o-grid__col u-12 u-8@sm">
          <h3 class="u-uppercase">Es un indicador que mide la relevancia parlamentaria de un diputado o diputada en función de su volumen de actividad, la efectividad de sus propuestas y su grado de accesibilidad.</h3>
          <h2>El algoritmo</h2>
          <p>El indicador de Huella parlamentaria está construido en base a diferentes variables que permiten medir y comparar la relevancia parlamentaria de los diputados y diputadas tanto a nivel general como en las diferentes <router-link :to="{name: 'topics' }">temáticas</router-link> a las que da seguimiento QHLD.</p>
          <p>Se trata de un indicador acumulado, que se actualiza semanalmente (todos los domingos) para cada uno de los miembros del Congreso de los Diputados y además para cada una de las temáticas.</p>
          <p>El indicador se calcula, para cada diputado o diputada, a partir de las siguientes variables:</p>
          <ul>
            <li>Número de iniciativas presentadas desde el inicio de la legislatura, diferenciado por cada tipo de iniciativa.</li>
            <li>Número de Proposiciones de Ley y Proposiciones No de Ley aprobadas de entre las presentadas por cada miembro del Congreso en cada temática.</li>
            <li>Existencia o no de una cuenta de correo electrónico pública.</li>
            <li>Existencia o no de redes sociales públicas.</li>
            <li>Número de meses transcurridos desde la última iniciativa presentada.</li>
          </ul>
          <p>A partir de esas variables se pretende medir:</p>
          <ul>
            <li>El volumen de actividad de cada diputado o diputada y su efectividad en cuanto a la aprobación de las iniciativas.</li>
            <li>La accesibilidad de los y las diputadas ante la ciudadanía.</li>
            <li>La presencia del diputado o diputada en el debate parlamentario.</li>
          </ul>
          <p>Para calcular la Huella se han definido 3 fases diferenciadas:</p>

          <h3>Fase 1: Cálculo del volumen de actividad y efectividad parlamentaria</h3>
          <p>En esta primera fase, se toma el total de iniciativas presentadas (menos las retiradas y las no admitidas a trámite) por cada diputado/a y además para cada una de las temáticas. Esta cantidad se pondera en función de los tipos de iniciativas presentadas. Cada tipo de iniciativa tiene un peso diferente en función de su relevancia política dentro de la actividad del Congreso de los Diputados, así como a la dedicación que implica su elaboración. Los pesos, que son una adaptación de los planteados por el <a href="https://politicalwatch.es/documentos/Capacidad-Congreso-Diputados-para-impulsar-Coherencia-de-Politicas-CIECODE.pdf" target="_blank">proyecto AVIZOR</a>, van desde el 0.1 al 40.0 y son los siguientes:</p>
          <table>
            <thead>
              <tr>
                <th>Categoría</th>
                <th>Subcategoría</th>
                <th>Peso</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Iniciativas de Control</td>
                <td>Pregunta oral en Pleno</td>
                <td>10</td>
              </tr>
              <tr>
                <td>Iniciativas de Control</td>
                <td>Pregunta oral al Gobierno en Comisión</td>
                <td>10</td>
              </tr>
              <tr>
                <td>Iniciativas de Control</td>
                <td>Pregunta al Gobierno con respuesta escrita</td>
                <td>0.1</td>
              </tr>
              <tr>
                <td>Iniciativas de Control</td>
                <td>Comparecencia del Gobierno en Comisión (art. 44)</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Iniciativas de Control</td>
                <td>Comparecencia del Gobierno en Comisión (arts. 202 y 203)</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Iniciativas de Control</td>
                <td>Comparecencia de autoridades y funcionarios en Comisión</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Iniciativas de Control</td>
                <td>Comparec. autoridades y funcionarios en Com. Mx. solicitada en Senado</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Iniciativas de Control</td>
                <td>Otras comparecencias en Comisión</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Iniciativas de Control</td>
                <td>Moción de censura</td>
                <td>10</td>
              </tr>
              <tr>
                <td>Iniciativas de Control</td>
                <td>Interpelación urgente</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Iniciativas de Control</td>
                <td>Interpelación ordinaria</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Iniciativas de Control</td>
                <td>Pregunta oral a la Corporación RTVE</td>
                <td>10</td>
              </tr>
              <tr>
                <td>Iniciativas de Control</td>
                <td>Pregunta a la Corporación RTVE con respuesta escrita</td>
                <td>0.1</td>
              </tr>
              <tr>
                <td>Iniciativas de Control</td>
                <td>Solicitud de informe a la Administración del Estado (art. 7)</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Iniciativas de Control</td>
                <td>Solicitud de informe a otra Entidad Pública (art. 7)</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Iniciativas de Control</td>
                <td>Solicitud de informe a la Administración del Estado (art. 44)</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Iniciativas de Control</td>
                <td>Solicitud de informe a otra Entidad Pública (art. 44)</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Iniciativas de Control</td>
                <td>Otras solicitudes de informe (art. 44)</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Iniciativas de orientación</td>
                <td>Proposición no de Ley ante el Pleno</td>
                <td>40</td>
              </tr>
              <tr>
                <td>Iniciativas de orientación</td>
                <td>Proposición no de Ley en Comisión</td>
                <td>40</td>
              </tr>
              <tr>
                <td>Iniciativas de orientación</td>
                <td>Moción consecuencia de interpelación ordinaria</td>
                <td>40</td>
              </tr>
              <tr>
                <td>Iniciativas de orientación</td>
                <td>Moción consecuencia de interpelación urgente</td>
                <td>40</td>
              </tr>
              <tr>
                <td>Iniciativas legislativas</td>
                <td>Proposición de ley de Grupos Parlamentarios del Congreso</td>
                <td>80</td>
              </tr>
              <tr>
                <td>Iniciativas legislativas</td>
                <td>Proposición de ley de Diputados</td>
                <td>80</td>
              </tr>
              <tr>
                <td>Iniciativas legislativas</td>
                <td>Proyecto de reforma Constitucional</td>
                <td>80</td>
              </tr>
              <tr>
                <td>Iniciativas legislativas</td>
                <td>Proposición de reforma Constitucional de Grupos Parlamentarios</td>
                <td>80</td>
              </tr>
              <tr>
                <td>Iniciativas legislativas</td>
                <td>Proposición de reforma constitucional de Comunidades Autónomas</td>
                <td>80</td>
              </tr>
            </tbody>
          </table>

          <div class="example">
            <h5 class="u-uppercase">Ejemplo</h5>
            <p>Así al aplicar este primer cálculo, una diputada obtendría una Huella parlamentaria de 191 tras haber presentado las siguientes iniciativas:</p>
            <ul>
              <li>3 preguntas orales en el pleno.</li>
              <li>10 preguntas al Gobierno para respuesta escrita.</li>
              <li>2 Proposiciones no de Ley en Comisión.</li>
              <li>1 Proposición de Ley de Grupos Parlamentarios.</li>
            </ul>
          </div>

          <p>El siguiente paso es valorar la efectividad, para lo que se revisa cuántas de las Proposiciones No de Ley y las Proposiciones de Ley presentadas por el diputado/a analizado han sido aprobadas. Cada una de ellas recibe una puntuación extra en base a los siguientes cálculos:</p>
          <table>
            <thead>
              <tr>
                <th>Categoría</th>
                <th>Tipo de iniciativa</th>
                <th>Peso</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Iniciativas de orientación</td>
                <td>Aprobación de Proposición no de Ley ante el Pleno</td>
                <td>20 puntos extra</td>
                <td>50% adicional sobre el peso de la iniciativa</td>
              </tr>
              <tr>
                <td>Iniciativas de orientación</td>
                <td>Aprobación de Proposición no de Ley en Comisión</td>
                <td>20 puntos extra</td>
                <td>50% adicional sobre el peso de la iniciativa</td>
              </tr>
              <tr>
                <td>Iniciativas legislativas</td>
                <td>Aprobación de Proposición de ley de Grupos Parlamentarios del Congreso</td>
                <td>60 puntos extra</td>
                <td>75% adicional sobre el peso de la iniciativa</td>
              </tr>
              <tr>
                <td>Iniciativas legislativas</td>
                <td>Aprobación de Proposición de ley de Diputados</td>
                <td>60 puntos extra</td>
                <td>75% adicional sobre el peso de la iniciativa</td>
              </tr>
            </tbody>
          </table>

          <div class="example">
            <h5 class="u-uppercase">Ejemplo</h5>
            <p>Así, la diputada obtendría 25 puntos extra y su Huella se elevaría a 271, si tuviera:</p>
            <ul>
              <li>1 Proposición No de Ley en Comisión aprobada.</li>
              <li>1 Proposición de Ley de Grupos Parlamentarios aprobada</li>
            </ul>
          </div>

          <p>Si el resultado del cálculo de la Fase 1 es mayor que cero, se procede a las Fases 2 y 3. En cambio, si este valor es de 0, se entiende que el diputado o diputada no cuenta aún con actividad parlamentaria y por tanto su Huella es de cero. En este sentido, las variables de las fases 2 y 3 están condicionadas a que exista una actividad parlamentaria ya en marcha.</p>

          <h3>Fase 2: Accesibilidad</h3>
          <p>En esta segunda fase, a la puntuación de la Huella ya obtenida se sumarán los siguientes puntos en función de dos variables:</p>
          <table>
            <tbody>
              <tr>
                <td><b>Redes Sociales</b></td>
                <td>¿Tiene redes sociales públicas?</td>
                <td>
                  Dos valores posibles:<br>
                  0: no tiene redes<br/>
                  40: tiene redes<br/>
                  El puntaje es el equivalente a 1 Proposición de Ley
                </td>
              </tr>
              <tr>
                <td><b>Correo de contacto</b></td>
                <td>¿Tiene un correo de contacto?</td>
                <td>
                  Dos valores posibles:<br>
                  0: no tiene correo<br/>
                  40: tiene correo<br/>
                  El puntaje es el equivalente a 1 Proposición de Ley
                </td>
              </tr>
            </tbody>
          </table>

          <div class="example">
            <h5 class="u-uppercase">Ejemplo</h5>
            <p>La huella de la diputada anterior ascendería a 351 si tuviera tanto una cuenta de Twitter como un correo electrónico público.</p>
          </div>

          <h3>Fase 3: Tiempo de inactividad</h3>
          <p>El último paso antes de obtener el puntaje final de la Huella es verificar el tiempo de inactividad de cada uno de los diputados y diputadas en cada una de las temáticas. Se entiende por inactividad el periodo en el cual no se ha presentado ningún tipo de iniciativa.</p>
          <p>En función de la cantidad de meses que lleve inactivo el diputado o diputada, se le penalizará con una reducción en su puntuación total de entre el 10 y el 50%, de acuerdo a las siguientes condiciones:</p>
          <ul>
            <li>Inactivo entre 3 y 6 meses: 10% de reducción de su Huella.</li>
            <li>Inactivo entre 6 y 12 meses: 25% de reducción de su Huella.</li>
            <li>Inactivo por más de 12 meses: 50% de reducción de su Huella.</li>
          </ul>

          <div class="example">
            <h5 class="u-uppercase">Ejemplo</h5>
            <p>Finalmente, suponiendo que la diputada llevara inactiva 7 meses, su Huella parlamentaria pasaría de 351 a 263.25.</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import PageHeader from '@/components/PageHeader';

export default {
  name: 'footprint',
  components: {
    PageHeader,
  },
}
</script>

<style scoped lang="scss">
thead {
  position: sticky;
  top: 0;
}
.example {
  background-color: #f3f3f3;
  padding: 32px;
  border-radius: 6px;
  border: solid 4px #1d1d1b;
  margin-top: 32px;
  margin-bottom: 32px;
}
</style>
