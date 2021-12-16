import { createStore } from "vuex"
import { getEncrypt } from "@/api/index"
import axios from "axios"
import { useRouter } from "vue-router"
const router = useRouter()

const state = {
        isLogged: false
    }
const getter = {
}
const mutations = {
    LOGIN (state: { isLogged: boolean }){
        state.isLogged = true
    },
    LOGOUT (state: { isLogged: boolean }){
        state.isLogged = false
    }
}
const actions = {
    login({ commit }, payload: {id: string, passwd: string}): void{
        const passwd_hashed = getEncrypt(payload.passwd)
        axios.post("/api/supplier/login",{"ownerID":payload.id,"password":passwd_hashed})
            .then( (response: {data: any})=> {
                console.log("then")
                const data = response.data
                if(data.statusCode == "successful"){
                    commit("LOGIN")
                    router.push("supplier/home")
                }
            })
            .catch((err:any)=>{
                console.log("catch")
                console.log(err)
            })
            .finally(()=>{console.log("finally")}) 
    }
}

export default {
    namespaced: true,
    state,
    getter,
    mutations,
    actions
}