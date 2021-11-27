import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import VueAxios from 'vue-axios'

import {
    // create naive ui
    create,
    // component
    NButton,
    NPageHeader,
    NH2,
    NLayout,
    NSpace,
    NInput
} from 'naive-ui'
  
  const naive = create({
    components: [NButton, NPageHeader, NH2, NLayout, NSpace, NInput]
  })

const app = createApp(App)
app.use(router)
app.use(naive)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')
