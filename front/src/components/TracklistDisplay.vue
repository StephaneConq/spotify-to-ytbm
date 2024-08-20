<template>
    <v-card id="card">
        <v-list lines="two">
            <v-list-item v-for="track in items" :key="track.title" :subtitle="track.subtitle" :title="track.title">
                <template v-slot:prepend>
                    <v-avatar color="grey-lighten-1">
                        <v-img :src="track.prependAvatar"></v-img>
                    </v-avatar>
                </template>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
import { useStore } from 'vuex';
import { computed, watch, ref } from 'vue';

export default {
    name: 'tracklist-display',
    mounted() {
        const card = document.querySelector('#card');
        document.querySelector('#card').onscroll = () => {
            const scrollPosition = card.scrollTop + card.offsetHeight;
            const scrollHeight = card.scrollHeight;

            if (scrollPosition >= scrollHeight) {
                this.$store.commit('spotify/setCurrentPage', this.$store.state.spotify.page + 1);
                this.$store.commit('utils/toggleLoading', true);
                this.$store.dispatch('spotify/fetchTracklist', {
                    page: this.$store.state.spotify.page
                }).then(() => {
                    this.$store.commit('utils/toggleLoading', false);
                });
            }
        }
    },
    unmounted() {
        this.$store.commit('spotify/setTracklist', []);
        this.$store.commit('spotify/setCurrentPlaylist', null);
    },
    setup() {
        const store = useStore();

        let items = ref([]);
        const tracklist = computed(() => store.getters['spotify/tracklist']);

        watch(
            () => store.state.spotify.tracklist,
            (newTracks) => {
                items.value = items.value.concat(newTracks.map(track => {
                    return {
                        prependAvatar: track.track.album.images[0].url,
                        title: track.track.name,
                        subtitle: track.track.artists.map(a => a.name).join(', ')
                    }
                }));
            }
        )

        return {
            items,
            tracklist
        }
    }
}

</script>

<style scoped>
#card {
    height: 100%;
    overflow: scroll;
}
</style>