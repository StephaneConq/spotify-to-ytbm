
export default {
  namespaced: true,
  state: () => ({
    loading: false
  }),
  getters: {
    loading(state) {
      return state.loading;
    }
  },
  actions: {

  },
  mutations: {
    toggleLoading(state, value = null) {
      if (value === null) {
        state.loading = !state.loading;
      } else {
        state.loading = value;
      }
    }
  }
}