<template>
    <v-dialog v-model="dialog" width="auto">
        <v-card max-width="400" prepend-icon="mdi-content-copy" :text="dialogOptions.text" :title="dialogOptions.title">
            <template v-slot:actions>
                <v-btn class="ms-auto" text="Fermer" @click="closeDialog(false)"></v-btn>

                <v-btn class="ms-auto" text="Ok" @click="closeDialog(true)"></v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>

<script>

import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
    name: 'confirm-dialog',
    setup() {
        const store = useStore();
        const dialog = computed(() => store.state.utils.confirmDialog);
        const dialogOptions = computed(() => store.state.utils.confirmOptions);

        const closeDialog = (confirm) => {
            store.commit('utils/toggleDialog', {
                confirmDialog: false,
                confirmOptions: {},
                isConfirmed: confirm,
            });
        }

        return {
            dialog,
            dialogOptions,
            closeDialog
        }
    }
}

</script>