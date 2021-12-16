import {createRouter, createWebHistory} from 'vue-router'

export default createRouter({
    'history': createWebHistory(),
    'routes': [
        {
            path: "/",
            redirect: "/supplier/login"
        },
        {
            path: "/test",
            component: () => import("../pages/test.vue")
        },
        {
            path: "/home",
            component: () => import("../pages/home.vue")
        },
        {
            path: '/about',
            component: () => import("../pages/about.vue")
        },
        {
            path: '/register',
            component: () => import("../pages/register.vue")
        },
        {
            path: '/login',
            component: () => import("../pages/login.vue")
        },
        {
            path: '/cart',
            component: () => import("../pages/cart.vue")
        },
        {
            path: '/good-list',
            component: () => import("../pages/good-list.vue")
        },
        {
            path: '/supplier/login',
            component: () => import("@/pages/supplier/login.vue")
        }
    ]
})
