import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/styles/style.scss'
import store from "@/vuex/store";


let app = createApp(App)

app.use(store)
app.mount('#app')


