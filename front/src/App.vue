<template>
  <v-progress-linear v-if="loading" color="primary" indeterminate></v-progress-linear>
  <main>
    <div class="toolbar-container">
      <div class="flex1">
        <v-btn icon="mdi-arrow-left" @click="$router.push('/')"></v-btn>
      </div>

      <div class="flex2">
        <img class="img" src="logo.png" />
      </div>

      <div class="flex1">
      </div>
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
}

main {
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.img {
  width: 96px;
}

.toolbar-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
}

.toolbar-container > .flex1 {
  width: 48px;
}

.toolbar-container > .flex2 {
  width: 96px;
}
</style>
