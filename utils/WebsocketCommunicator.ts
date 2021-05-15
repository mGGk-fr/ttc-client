export enum WebSocketEvents {
  REGISTER_PLAYER = 'registerPlayer',
  PLAYER_REGISTRED = 'playerRegistred',
  GET_PLAYER_LIST = 'getPlayerList',
  NEW_PLAYER = 'newPlayer',
  PLAYER_LEFT = 'playerLeft',
  ASK_DUEL = 'askDuel',
}

class WebsocketCommunicator {
  socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('ws://localhost:8080');
  }

  listenTo(eventName: string, callback: Function) {
    this.socket.addEventListener('message', (message) => {
      const data = this.decodeMessage(message.data);
      if (data.type === eventName) {
        callback(data.data);
      }
    });
  }

  sendEvent(eventName: string, data: any) {
    this.socket.send(JSON.stringify({ type: eventName, data }));
  }

  decodeMessage(message: string) {
    return JSON.parse(message);
  }
}

export default new WebsocketCommunicator();
