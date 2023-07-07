import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueToast from 'vue-toast-notification'
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'
import 'vue-toast-notification/dist/theme-sugar.css'

const app = createApp(App)

app.use(router)
app.use(VueToast)
app.mount('#app')
