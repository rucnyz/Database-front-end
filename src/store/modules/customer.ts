const state = {
    isLogged : false
}
const getters = {
    
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
    
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}