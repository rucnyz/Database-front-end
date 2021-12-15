const customer = {
    namespaced: true,
    state:()=>({
        isLogged : false
    }),
    getters:{
        
    },
    mutations:{
        LOGIN (state: { isLogged: boolean }){
            state.isLogged = true
        },
        LOGOUT (state: { isLogged: boolean }){
            state.isLogged = false
        }
    },
    actions:{
        
    }
}

export default customer