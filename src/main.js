import { createApp } from 'vue'
// TODO: agregar
import "bootstrap/dist/css/bootstrap.min.css";

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')

// TODO: agregar
import "bootstrap/dist/js/bootstrap.min";
