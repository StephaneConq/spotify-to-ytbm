import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import globalStore from './stores'
import '@mdi/font/css/materialdesignicons.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark',
        themes: {
            dark: {
                dark: true,
                variables: {}, // ✅ this property is required to avoid Vuetify crash

                colors: {
                    primary: '#1bcf5e',
                    secondary: 'white',
                    accent: '#e101a0',
                    error: '#b71c1c',
                },
            }
        }
    }
})


createApp(App).use(globalStore).use(vuetify).use(router).mount('#app')
