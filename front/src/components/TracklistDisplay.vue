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
                console.log('User has scrolled to the bottom of the element!');
            }
        }
    },
    setup() {
        const store = useStore();

        let items = ref([]);
        const tracklist = computed(() => store.getters['spotify/tracklist']);

        watch(
            () => store.state.spotify.tracklist,
            (newTracks) => {
                items.value = newTracks.map(track => {
                    return {
                        prependAvatar: track.track.album.images[0].url,
                        title: track.track.name,
                        subtitle: track.track.artists.map(a => a.name).join(', ')
                    }
                });
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