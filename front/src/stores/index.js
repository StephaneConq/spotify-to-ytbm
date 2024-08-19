import { createStore } from 'vuex';
import spotifyStore from './spotify';
import utilsStore from './utils';

export default createStore({
  namespaced: true,
  modules: {
    spotify: spotifyStore,
    utils: utilsStore
  }
})