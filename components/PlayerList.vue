<template>
  <VList>
    <VListItem>Me</VListItem>
  </VList>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import WebsocketCommunicator, {
  WebSocketEvents,
} from '@/utils/WebsocketCommunicator';

@Component
export default class PlayerList extends Vue {
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
        console.log(message);
      }
    );
  }
}
</script>
