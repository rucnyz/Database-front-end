import {createStore} from 'vuex'
import Cusomter from '@/store/modules/customer'
import Supplier from '@/store/modules/supplier'
// 创建一个新的 store 实例
export default createStore({
    modules:{
        supplier: Supplier,
        costomer: Cusomter,
        
    }
})
