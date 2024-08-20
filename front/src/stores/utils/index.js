
export default {
  namespaced: true,
  state: () => ({
    loading: false,
    confirmDialog: false,
    confirmOptions: {},
    isConfirmed: false,
    snackbar: false,
    snackbarText: ''
  }),
  getters: {
    loading(state) {
      return state.loading;
    },
    confirmDialog(state) {
      return state.confirmDialog;
    },
    confirmOptions(state) {
      return state.confirmOptions;
    },
    snackbar(state) {
      return state.snackbar;
    },
    snackbarText(state) {
      return state.snackbarText;
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
    },
    toggleDialog(state, payload) {
      state.confirmDialog = payload.confirmDialog;
      state.confirmOptions = payload?.confirmOptions;
      state.isConfirmed = payload.isConfirmed;
    },
    toggleSnackbar(state, payload) {
      state.snackbar = payload.snackbar;
      state.snackbarText = payload.snackbarText;
    }
  }
}