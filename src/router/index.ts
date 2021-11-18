import {createRouter, createWebHistory} from 'vue-router'

export default createRouter({
    'history':createWebHistory(),
    'routes':[
        {
            path:"/",
            redirect:"home"
        },
        {
            path:"/home",
            component: ()=>import("../pages/home.vue")
        },
        {
            path:'/about',
            component: ()=>import("../pages/about.vue")
        }
    ]
})