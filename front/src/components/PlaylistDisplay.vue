<template>
    <div class="playlist-container">
        <v-img v-if="getImage" :height="200" :width="200" :src="getImage()"></v-img>

        <h2>{{ playlist.name }}</h2>

        <h3>{{ playlist.description }}</h3>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'playlist-display',
    setup() {
        const store = useStore();
        const playlist = computed(() => store.getters['spotify/playlist']);

        const getImage = () => {
            return playlist.value.images ? playlist.value.images[0].url : null;
        }

        return {
            playlist,
            getImage
        }
    }
}
</script>

<style scoped>
.playlist-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: fit-content;
}
</style>