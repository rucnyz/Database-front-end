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
            path: '/good-detail',
            component: () => import("../pages/good-detail.vue")
        },
        {
            path: '/order',
            component: () => import("../pages/order.vue")
        },
        {
            path: '/my',
            component: () => import("../pages/my.vue")
        },
        {
            path: '/affirm-order',
            component: () => import("../pages/affirm-order.vue")
        },
        {
            path: '/supplier',
            component: () => import("@/pages/supplier/index.vue"),
            children:[
                {
                    path: 'home',
                    component: () => import("@/pages/supplier/home.vue")
                },
                {
                    path: 'login',
                    component: () => import("@/pages/supplier/login.vue")
                },
                {
                    path: 'register',
                    component: () => import("@/pages/supplier/register.vue")
                }
            ]
        }

    ]
})
