<template>
  <v-progress-linear v-if="loading" color="primary" indeterminate></v-progress-linear>
  <main>
    <v-img class="img" :width="200" cover
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png"></v-img>
  <router-view />
  </main>
  
</template>

<script>
import {computed} from 'vue';
import {useStore} from 'vuex';

export default {
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
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
