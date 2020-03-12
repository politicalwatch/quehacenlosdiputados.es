<template>
  <div>
    <div id="about" class="o-container o-section u-margin-bottom-10">
      <tipi-header title="About"/>
      <div class="o-grid">
        <div class="o-grid__col u-8@sm u-offset-2@sm">
          <router-link class="c-button c-button--compact u-padding-left-0" :to="{name: 'about'}">Leer esta página en español</router-link>
          <p>Parlamento 2030 is an innovative platform created to track, gather and offer the information of the Spanish national Parliament activity related to the Sustainable Development Goals. Designed to overcome the challenges of the cross-cutting nature of the Agenda 2030, Parlamento 2030 classifies the information related to the SDGs through an advanced system of automatic massive tagging. This groundbreaking technology enables users to navigate SDG-related parliamentary activity through an openly and freely online search browser. The information provided is key to the monitoring and accountability of the implementation of the Agenda 2030 at the national level.</p>
          <h4>How does it work?</h4>
          <p>Parlamento 2030 gathers all information published by the Parliament and creates a database through an automatic process of massive-tagging that classifies it according to its linkage to any specific SDG goal and target. It combines advanced computer science - needed to scrap thousand of PDF files where legislation is published and transform them into a structured database - with the design of a SDG thesaurus that automatically links political initiatives to their related goals and targets. Then, through an intuitive, attractive and accessible interface, all relevant information is provided in a reusable format. Users can select their own search parameters to tailor their inquiries according to their specific needs.</p>
          <h4>What answers does it provide?</h4>
          <p>Parlamento 2030 helps to find the less obvious answers to complicated questions at first sight: Which SDGs are affected by a certain legislative initiative? Which of Agenda 2030’s goals or targets receive the most attention by MPs, and which are being left behind? Which MPs are most active in the implementation of the 2030 Agenda, and who is neglecting it? It also provides a cost-efficient means of analysing political activity by detecting all legislative initiatives related to a goal or target being proposed and discussed at the same time across different parliamentary committees.</p>
          <h4>Why parliaments?</h4>
          <p>National parliaments have a key role in the Agenda 2030 implementation process. They are the most relevant and best-positioned public institutions to ensure the coherence with sustainable development in the hundreds of thousands of laws, legislative initiatives, public plans and budgets that will be passed in each country in the years to come.</p>
          <h4>Can it be adapted to other countries?</h4>
          <p>Yes, it can. The technology used for Parlamento 2030 is currently adapted to the Spanish Parliament due to the interest of the Spanish Government to include this platform as part of the official Spanish National Action Plan for the implementation of the Agenda 2030, presented to United Nations during the Spanish Voluntary National Report in 2018.
          As it has been adapted to the Spanish Parliament, it is possible also to do so in another country or another level of public administration. Whether it is another country, a region or the EU Parliament who shows interest, this technology could be quickly implemented in a short period of time due the open source and code used.
          </p>
          <h4>Who we are?</h4>
          <p>This is a project of <a href="http://politicalwatch.es" target="_blank">Political Watch</a>, a platform of engineers, economic experts and journalists created under the umbrella of <a href="http://ciecode.es" target="_blank">CIECODE</a>, a think-and-do tank focused on policy coherence for sustainable development. Our mission is to promote an informed and fact-based public debate on sustainable development. We develop innovative technologies to automatically track sustainable development-related activity and offer public, direct, and free access to this information to citizens and key stakeholders.</p>
          <h4>Where this come from?</h4>
          <p>Parlamento 2030 is an adaptation of TiPi, an existing online tool implemented in Spain since 2015, which monitors all parliamentarian activity in 21 selected topics related with the fight against poverty and inequality. TiPi (which stands for Transparency + Information + Participation + Influence) is another Political Watch’s innovative project that generates open-data and promotes transparency, access to information, and political accountability by allowing the monitoring of all parliamentarian activity related to the fight against poverty and inequality. TiPi is able to automatically classify the parliamentarian activity in 21 strategically selected topics, through the same advanced scraping and labeling technology used in Parlamento 2030.</p>
          <div class="u-text-center">
            <router-link class="c-button c-button--primary" :to="{name: 'mediakit'}">Visit our Mediakit</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TipiHeader } from 'tipi-uikit';

export default {
  name: 'about-english',
  components: {
    TipiHeader,
  },
}
</script>
