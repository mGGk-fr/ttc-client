<template>
  <VList>
    <VSubheader>Online players : {{ filteredPlayerList.length }}</VSubheader>
    <VListItem v-for="player in filteredPlayerList" :key="player.uuid">
      <VListItemContent>
        <VListItemTitle v-text="player.name"></VListItemTitle>
      </VListItemContent>
    </VListItem>
  </VList>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import WebsocketCommunicator, {
  WebSocketEvents,
} from '@/utils/WebsocketCommunicator';

@Component
export default class PlayerList extends Vue {
  playerList = [];

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
}
</script>
