<script setup lang="ts">
import HelloImage from "./hello_image.vue";
import HelloImageAlt from "./hello_image_alt.vue";

import { useDisplay } from "vuetify";
import MaterialH1 from "~/components/text/MaterialH1.vue";
import MaterialH2 from "~/components/text/MaterialH2.vue";
import TutorialsByTopic from "./tutorials_by_topic.vue";

definePageMeta({
  path: "/",
});

const { mdAndUp, sm, smAndUp } = useDisplay();


</script>

<template>
  <v-container fluid class="landing-page">
    <v-row justify="center" class="px-lg-16 px-sm-4">
      <v-col align-self="center" class="text-center">
        <MaterialH1>Sveiki atvykę!</MaterialH1>
        <MaterialH2 class="mt-2">Python pamokos</MaterialH2>
      </v-col>
      <v-col v-if="smAndUp" align-self="center">
        <HelloImage v-if="mdAndUp" />
        <HelloImageAlt v-if="sm" />
      </v-col>
    </v-row>
    <TutorialsByTopic topic="basics"/>
    <TutorialsByTopic topic="asteroid_clone"/>

    <div class="mb-6 px-lg-16 mx-0 px-sm-4 mr-sm-2 mr-md-10 dummy-text-section text-justify">
      <MaterialH2 class="text-left">Puslapį užpildantis tekstas</MaterialH2>
      <p class="text-justify">
        Puslapis turintis per mažai teksto atrodo nekaip. Šiai problemai
        išspręsti ši puslapio dalis bus užpildyta beverčiu tekstu. Ateityje ši
        vieta bus pakeista reikšmingesniu tekstu. Dažniausiai, kuriant kažkokį
        tai medijos turinį (puslapį, leidinį, vaizdo įrašą), vietoje konkretaus
        teksto naudojamas sugeneruotas arba <i>lorem ipsum</i>.
        <i>Lorem ipsum</i> yra fiktyvus tekstas, kuris pradėtas naudotas
        anksčiau nei atsirado kompiuteriai. Žemiau esanti pastraipa (97 žodžiai)
        su daug neaiškių žodžių yra sugeneruota su <i>lorem ipsum</i>. įrankiu.
        Apie šį tekstą galite pasiskaityti
        <a target="_blank" href="https://lt.lipsum.com/">čia</a>.
      </p>
      <p class="text-justify">
        Šis tekstas apribotas taip, kad tilptų 50-70 simbolių į eilutę. Pagal
        gerąją dizaino praktiką ir mokslą, žmogus greičiau skaito tekstą, kai
        eilutėje yra 50-70 simbolių. Daugiau apie tai galite pasiskaityti
        <a
          target="_blank"
          href="https://ux.stackexchange.com/questions/108801/what-is-the-best-number-of-paragraph-width-for-readability"
          >čia</a
        >.
      </p>
      <p class="text-justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc congue,
        justo vel aliquam volutpat, sapien sapien suscipit orci, eu dapibus diam
        massa ultrices sem. Donec at tristique ipsum. Praesent vel ipsum vel sem
        viverra elementum. Morbi bibendum ligula id massa eleifend ornare. Nam
        cursus, ligula vel hendrerit sollicitudin, lacus enim suscipit mi, quis
        congue erat nulla at tortor. Nullam interdum lorem vel porttitor
        vehicula. Donec dapibus, risus in condimentum varius, lorem massa
        convallis neque, sed varius enim metus sed lacus. Integer turpis tellus,
        sodales id arcu sed, convallis sodales est. Nam pharetra dapibus
        vehicula. Vivamus mauris libero.
      </p>
    </div>
  </v-container>
</template>

<style>
@media screen and (max-width: 600px) {
  .pattern-container {
    border-top-right-radius: 8px !important;
    border-bottom-right-radius: 8px !important;
    border-top-left-radius: 8px !important;
    border-bottom-left-radius: 8px !important;
  }
}

@media screen and (min-width: 1920px) {
  .landing-page {
    max-width: 1920px;
  }
}

.landing-page .landing-page-image {
  width: 100%;
}

.v-theme--light .pattern-container {
  --pattern-color-stroke: rgba(var(--v-theme-surface), 1);
}

.v-theme--dark .pattern-container {
  --pattern-color-stroke: rgba(var(--v-theme-inverse-surface), 0.1);
}

.landing-page-pattern {
  -webkit-mask-image: radial-gradient(
    20em 12rem at 16% 50%,
    white,
    transparent
  );
  mask-image: radial-gradient(20em 16rem at 16% 50%, white, transparent);
  stroke: var(--pattern-color-stroke);
  width: 100%;
  height: 100%;
  z-index: -1;
  left: 0px;
  right: 0px;
  top: 0px;
  display: block;
  position: absolute;
}

.pattern-container {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  transition: border-radius 1s;
}

.dummy-text-section h2 {
  margin-bottom: 24px;
}

.dummy-text-section p {
  font-size: 1.375rem !important;
  font-weight: 300;
  line-height: 2rem;
  letter-spacing: 0.002em !important;
  font-family: "Noto Sans", "Roboto", sans-serif;
  margin-top: 16px;
  margin-bottom: 16px;
  max-width: 46em;
  margin-right: auto;
}
</style>
