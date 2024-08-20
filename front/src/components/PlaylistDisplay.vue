<template>
    <div class="playlist-container">
        <v-img v-if="getImage" :height="200" :width="200" :src="getImage()"></v-img>

        <h2>{{ playlist.name }}</h2>

        <h3>{{ playlist.description }}</h3>

        <section class="copy-actions">
            <v-btn @click="openDialog" icon="mdi-content-copy" size="large"></v-btn>
        </section>
    </div>
</template>

<script>
import { computed, watch } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'playlist-display',
    setup() {
        const store = useStore();
        const playlist = computed(() => store.getters['spotify/playlist']);

        const getImage = () => {
            return playlist.value.images ? playlist.value.images[0].url : null;
        }

        watch(
            () => store.state.utils.isConfirmed,
            (newIsConfirmed) => {
                if (newIsConfirmed) {
                    store.dispatch('spotify/startCopy', { playlistId: playlist.value.id }).then(() => {
                        store.commit('utils/toggleSnackbar', {
                            snackbar: true,
                            snackbarText: 'Création de playlist lancée'
                        });
                        setTimeout(() => {
                            store.commit('utils/toggleSnackbar', {
                                snackbar: false,
                                snackbarText: ''
                            });
                        }, 3000);
                    });
                }
            }
        )

        const openDialog = () => {
            store.commit('utils/toggleDialog', {
                confirmDialog: true,
                confirmOptions: {
                    title: 'Copier playlist',
                    text: 'Copier la playlist sur Youtube Music ?'
                }
            });
        }

        return {
            playlist,
            getImage,
            openDialog
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
    width: 100%;
    padding: 5px;
}

.copy-actions {
    width: 100%;
}
</style>