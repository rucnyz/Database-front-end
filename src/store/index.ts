import {createStore} from 'vuex'
import Cusomter from './modules/customer'
// 创建一个新的 store 实例
export default createStore({
    modules:{
        Cusomter
    }
})