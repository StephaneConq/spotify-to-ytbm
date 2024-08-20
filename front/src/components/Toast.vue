<template>
    <v-snackbar v-model="snackbar">
        {{ text }}

        <template v-slot:actions>
            <v-btn color="pink" variant="text" @click="snackbar = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
    name: 'toast-dialog',
    setup() {
        const store = useStore();
        const snackbar = computed(() => store.state.utils.snackbar);
        const text = computed(() => store.state.utils.snackbarText);
        return {
            snackbar,
            text
        }
    }
}

</script>