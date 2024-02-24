import { createApp } from 'vue'
import routes from './routes'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import App from './App.vue'
import './assets/scss/main.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

app.component("v-select", vSelect);
app.use(routes)
app.use(pinia)
app.use(ElementPlus)

app.mount('#app')
