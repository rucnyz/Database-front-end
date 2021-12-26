import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
import "./style/index.less";
import store from './store/index'
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
    NMessageProvider,
    NInputGroup,
    NCarousel,
    NSelect,
    NCard,
    NEmpty,
    NDialogProvider,
    NCheckbox,
    NInputNumber,
    NPopconfirm,
    NModal,
    NRadio,
    NRadioGroup,
    NTabPane,
    NTabs,
    NTable,
    NScrollbar
} from 'naive-ui'

const naive = create({
    components: [NButton, NPageHeader, NH2, NLayout, NSpace, NInput, NMessageProvider,
        NCarousel, NInputGroup, NSelect, NCard, NEmpty, NDialogProvider, NCheckbox,
        NPopconfirm, NInputNumber, NModal, NRadio, NRadioGroup, NTabPane, NTabs, NTable, NScrollbar]
})


const app = createApp(App)
app.use(router)
app.use(naive)
app.use(VueAxios, axios)
app.use(store)
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')
