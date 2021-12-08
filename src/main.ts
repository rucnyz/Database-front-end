import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {createStore} from 'vuex'
import {
    // create naive ui
    create,
    // component
    NButton,
    NPageHeader,
    NH2,
    NLayout,
    NSpace,
    NInput,
    NMessageProvider
} from 'naive-ui'

const naive = create({
    components: [NButton, NPageHeader, NH2, NLayout, NSpace, NInput, NMessageProvider]
})
// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            count: 0
        }
    },
    mutations: {
        increment(state: { count: number }) {
            state.count++
        }
    }
})
const app = createApp(App)
app.use(router)
app.use(naive)
app.use(VueAxios, axios)
app.use(store)
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')
