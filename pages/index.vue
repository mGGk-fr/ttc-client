<template>
  <div class="main-panel">
    <ChoosePseudoDialog v-if="!playerHasSetPseudonym" />
    <MainPanel v-else />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

enum STATE {
  HOME = 'home',
  PSEUDO = 'pseudo',
  GAME = 'game',
}

@Component
export default class PageIndex extends Vue {
  get playerHasSetPseudonym() {
    return this.$store.getters.hasSetPseudo;
  }

  get state() {
    if (!this.playerHasSetPseudonym) {
      return STATE.PSEUDO;
    }
    return STATE.HOME;
  }
}
</script>
