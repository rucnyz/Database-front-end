import {createRouter, createWebHistory} from 'vue-router'

export default createRouter({
    'history': createWebHistory(),
    'routes': [
        {
            path: "/",
            redirect: "/supplier/home/S000000001"
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
            component: () => import("../pages/goods-list.vue")
        },
        {
            path: '/good-detail',
            component: () => import("../pages/goods-detail.vue")
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

            path: '/admin-login',
            component: () => import("../pages/admin-login.vue")
        },
        {
            path: '/statistics-data',
            component: () => import("../pages/statistics-data.vue")
        },
        {
            path: '/supplier',
            component: () => import("@/pages/supplier/index.vue"),
            children:[
                {
                    path: 'home/:id',
                    component: () => import("@/pages/supplier/home.vue"),
                    children:[
                        {
                            // 默认跳转订单页
                            path: "",
                            redirect: {name: "supplier.home.order"}
                        },
                        {
                            path: "order",
                            name: "supplier.home.order",
                            component: () => import("@/pages/supplier/home/order.vue")
                        },
                        {
                            path: "product",
                            name: "supplier.home.product",
                            component: () => import("@/pages/supplier/home/product.vue")
                        }
                    ]
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
        },
    ]
})
