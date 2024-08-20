<template>
  <v-progress-linear v-if="loading" color="primary" indeterminate></v-progress-linear>
  <main>
    <div class="toolbar-container">
      <div>
        <v-btn icon="mdi-arrow-left" @click="$router.push('/')"></v-btn>
      </div>

      <img class="img" src="logo.png" />

      <div></div>
    </div>

    <router-view />
  </main>
  <ConfirmDialog />
  <ToastDialog />
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import ToastDialog from '@/components/Toast.vue';

export default {
  components: {
    ConfirmDialog,
    ToastDialog
  },
  setup() {
    const store = useStore();
    const loading = computed(() => store.getters['utils/loading']);

    return {
      loading
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

main {
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.img {
  margin: 10px;
  width: 200px;
}

.toolbar-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
</style>
