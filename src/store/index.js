import { createStore } from 'vuex';
import boardStore from './modules/board-store';
import userStore from './modules/user-store';

const store = createStore({
  strict: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    boardStore,
    userStore,
  },
});

export default store;
