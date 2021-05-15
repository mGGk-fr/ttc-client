<template>
  <div class="player-list">
    <VList class="player-list">
      <VSubheader>Online players : {{ filteredPlayerList.length }}</VSubheader>
      <VListItem
        v-for="player in filteredPlayerList"
        :key="player.uuid"
        class="player-list__player"
        @click="askDuelTo(player)"
      >
        <VListItemContent>
          <VListItemTitle v-text="player.name"></VListItemTitle>
        </VListItemContent>
      </VListItem>
      <VDialog v-model="askingDuel" persistent width="300">
        <VCard color="primary" dark>
          <VCardText>
            Sending duel invite, please wait...
            <VProgressLinear
              indeterminate
              color="white"
              class="mb-0"
            ></VProgressLinear>
          </VCardText>
        </VCard>
      </VDialog>
      <VDialog v-model="recivingDuel" persistent width="300">
        <VCard color="primary" dark>
          <VCardText> {{ invitingPlayer.name }} invited you to play </VCardText>
          <VCardActions>
            <VSpacer />
            <VBtn> Accept </VBtn>
            <VBtn> Deny </VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
    </VList>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import WebsocketCommunicator, {
  WebSocketEvents,
} from '@/utils/WebsocketCommunicator';

@Component
export default class PlayerList extends Vue {
  playerList = [];
  askingDuel = false;
  recivingDuel = false;
  invitingPlayer = undefined;

  get filteredPlayerList() {
    return this.playerList.filter(
      (player) => player.uuid !== this.$store.state.uuid
    );
  }

  mounted() {
    this.registerPlayerEvents();
    this.loadPlayerList();
  }

  loadPlayerList() {
    WebsocketCommunicator.sendEvent(WebSocketEvents.GET_PLAYER_LIST, {});
  }

  registerPlayerEvents() {
    WebsocketCommunicator.listenTo(
      WebSocketEvents.GET_PLAYER_LIST,
      (message) => {
        this.playerList = message.list;
      }
    );
    WebsocketCommunicator.listenTo(WebSocketEvents.NEW_PLAYER, (message) => {
      this.playerList.unshift(message);
    });
    WebsocketCommunicator.listenTo(WebSocketEvents.PLAYER_LEFT, (message) => {
      this.playerList = this.playerList.filter(
        (player) => player.uuid !== message.uuid
      );
    });
  }

  askDuelTo(player) {
    this.askingDuel = true;
    WebsocketCommunicator.sendEvent(WebSocketEvents.ASK_DUEL, {
      initialPlayer: this.$store.getters.playerObject,
      invitedPlayer: player,
    });
  }
}
</script>
<style scoped lang="scss">
.player-list {
  &__player {
    cursor: pointer;
  }
}
</style>
