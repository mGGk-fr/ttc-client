<template>
  <v-dialog v-model="showDialog" width="500" persistent>
    <v-card>
      <v-card-title class="headline"> Set your pseudonym </v-card-title>

      <v-card-text>
        <v-form ref="form" @submit.prevent="setPseudonym">
          <v-text-field
            v-model="userPseudonym"
            label="Your Pseudonym"
            :rules="nameRules"
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="setPseudonym"> Validate </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import WebsocketCommunicator, {
  WebSocketEvents,
} from '~/utils/WebsocketCommunicator';

@Component
export default class ChoosePseudoDialog extends Vue {
  showDialog = true;
  userPseudonym = '';
  nameRules = [(v: any) => !!v || 'Pseudo is required'];

  mounted() {
    this.showDialog = !this.$store.getters.hasSetPseudo;
    WebsocketCommunicator.listenTo(
      WebSocketEvents.PLAYER_REGISTRED,
      (message: any) => {
        this.$store.commit('setUserPseudo', message.pseudo);
        this.$store.commit('setUserUUID', message.uuid);
        this.showDialog = false;
      }
    );
  }

  setPseudonym() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      WebsocketCommunicator.sendEvent(WebSocketEvents.REGISTER_PLAYER, {
        pseudo: this.userPseudonym,
      });
    }
  }
}
</script>
