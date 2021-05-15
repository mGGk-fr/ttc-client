import { GetterTree, MutationTree } from 'vuex';

export const state = () => ({
  pseudo: '',
  uuid: '',
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  hasSetPseudo: (state) => state.pseudo !== '',
  playerObject: (state) => ({ name: state.pseudo, uuid: state.uuid }),
};

export const mutations: MutationTree<RootState> = {
  setUserPseudo: (state, newPseudo: string) => (state.pseudo = newPseudo),
  setUserUUID: (state, uuid: string) => (state.uuid = uuid),
};
