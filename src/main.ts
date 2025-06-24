import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

//vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives,
})

createApp(App)
    .use(createPinia())
    .use(vuetify)
    .mount('#app')
