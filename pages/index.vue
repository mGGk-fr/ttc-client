<template>
  <div class="main-panel">
    <ChoosePseudoDialog v-if="!playerHasSetPseudonym" />
    <MainPanel v-else />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class PageIndex extends Vue {
  get playerHasSetPseudonym() {
    return this.$store.getters.hasSetPseudo;
  }
}
</script>
