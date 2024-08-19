<template>
  <div class="container" v-if="playlist">

    <div class="left">
      <PlaylistDisplay />
    </div>

    <div class="right">
      <TracklistDisplay />
    </div>

  </div>
</template>

<script>
import { computed, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import PlaylistDisplay from '@/components/PlaylistDisplay.vue';
import TracklistDisplay from '@/components/TracklistDisplay.vue';

export default {
  name: 'PlaylistTracksView',
  components: {
    PlaylistDisplay,
    TracklistDisplay
  },
  setup() {
    const app = getCurrentInstance();
    const store = useStore();

    const tracks = computed(() => store.getters['spotify/tracklist']);
    const playlist = computed(() => store.getters['spotify/playlist']);

    const playlistId = app.appContext.config.globalProperties.$route.params.id;
    let page = 1;

    const loadTracks = () => {
      return store.dispatch('spotify/fetchTracklist', {
        playlistId,
        page
      });
    }

    const loadPlaylist = () => {
      return store.dispatch('spotify/fetchPlaylistById', playlistId);
    }

    store.commit('utils/toggleLoading', true);

    Promise.all([loadTracks(), loadPlaylist()]).then(() => {
      store.commit('utils/toggleLoading', false);
    });

    return {
      playlistId,
      playlist,
      tracks
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
  width: 100%;
  max-height: calc(100vh - 200px - 20px);
  overflow: hidden;
}

.left {
  width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.right {
  width: 66%;
}
</style>