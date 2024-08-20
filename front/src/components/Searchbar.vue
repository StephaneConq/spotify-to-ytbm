<template>
  <div class="container">
    <section class="input-container">
      <v-autocomplete @update:search="search" item-title="name" item-value="id" class="autocomplete"
        label="Search Spotify playlist" :items="playlists" variant="outlined"
        :hide-no-data="true">
        <template v-slot:append>
           
        </template>
        <template v-slot:item="{ props, item }">
          <v-list-item @click="playlistSelected(item, $router)" v-bind="props" :prepend-avatar="getImage(item.raw)" :subtitle="sliceStr(item.raw.description)"
            :title="sliceStr(item.title)"></v-list-item>
        </template>
      </v-autocomplete>
    </section>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'search-bar',
  unmounted() {
    this.$store.commit('spotify/setPlaylists', []);
  },
  setup() {
    const store = useStore();
    let timeoutValue = null;
    const playlists = computed(() => store.getters['spotify/playlists']);
    let allowedSearch = true;

    const getImage = (item) => {
      if (item.images && item.images.length) {
        return item.images[0]?.url;
      }
      return '';
    }

    const sliceStr = (str) => {
      if (str.includes('https')) {
        return '';
      }
      let desc = str ? str.toString().slice(0, 47) : '';
      if (desc.length === 47) {
        desc += '...';
      }
      return desc;
    }

    const playlistSelected = function (playlist, router) {
      allowedSearch = false;
      router.push(`/playlist/${playlist.value}/tracks`);
    }

    const search = (event) => {
      if (!allowedSearch) {
        return;
      }
      if (!event?.length) {
        store.commit('spotify/setPlaylists', []);
        return;
      }
      store.commit('utils/toggleLoading', true);
      if (timeoutValue) {
        clearTimeout(timeoutValue);
      }
      timeoutValue = setTimeout(() => {
        store.dispatch('spotify/updatePlaylists', {
          query: event,
          page: 1
        }).finally(() => {
          store.commit('utils/toggleLoading', false);
        });
      }, 500);
    };

    return {
      playlists,
      search,
      getImage,
      sliceStr,
      playlistSelected
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.input-container {
  width: 75%;
  padding: 25px;
}
</style>
