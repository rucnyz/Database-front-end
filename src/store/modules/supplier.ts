import { createStore } from "vuex"
import { getEncrypt } from "@/api/index"
import axios from "axios"
import router from "@/router/index"


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
                const data = response.data
                if(data.statusCode == "successful"){
                    commit("LOGIN")
                    localStorage.setItem(
                        "role_infl",
                        JSON.stringify({
                          roleId: data["suppID"]
                        })
                    )
                    router.push({path:`/supplier/home/${data.suppID}`})
                }
            })
            .catch((err:any)=>{
                console.log(err)
            })
    }
}

export default {
    namespaced: true,
    state,
    getter,
    mutations,
    actions
}