
export default {
  namespaced: true,
  state: () => ({
    playlists: [],
    playlist: null,
    tracklist: [],
    page: 1
  }),
  getters: {
    playlist(state) {
      return state.playlist ?? {};
    },
    playlists(state) {
      return state.playlists ?? [];
    },
    tracklist(state) {
      return state.tracklist ?? [];
    },
    page(state) {
      return state.page;
    }
  },
  actions: {
    async updatePlaylists({ commit }, payload) {
      const req = await fetch(`${process.env.VUE_APP_API_URL}/spotify/playlist/search?q=${payload.query}&page=${payload.page}`);
      const res = await req.json();
      commit('setPlaylists', res);
    },
    async fetchTracklist({ state, commit }, payload) {
      let playlistId = null;
      if (!payload.playlistId && state.playlist) {
        playlistId = state.playlist.id;
      } else {
        playlistId = payload.playlistId;
      }
      const req = await fetch(`${process.env.VUE_APP_API_URL}/spotify/playlist/${playlistId}/tracks?page=${payload.page}`);
      const res = await req.json();
      commit('setTracklist', res);
    },
    async fetchPlaylistById({ commit }, playlistId) {
      const req = await fetch(`${process.env.VUE_APP_API_URL}/spotify/playlist/${playlistId}`);
      const res = await req.json();
      commit('setCurrentPlaylist', res);
    },
    async startCopy(_, payload) {
      const req = await fetch(`${process.env.VUE_APP_API_URL}/spotify/playlist/${payload.playlistId}/copy`);
      const  res = await req.json();
      return res;
    }
  },
  mutations: {
    setPlaylists(state, playlists) {
      state.playlists = [...playlists];
    },

    setTracklist(state, tracklist) {
      state.tracklist = [...tracklist];
    },

    setCurrentPlaylist(state, playlist) {
      state.playlist = playlist;
    },
    setCurrentPage(state, page) {
      state.page = page;
    }
  }
}