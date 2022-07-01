import { createRouter, createWebHistory } from "vue-router";
import store from "./store";

var router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            alias: '/produk',
            component: () => import('@/pages/produk/IndexPage'),
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/login",
            component: () => import('@/pages/LoginPage'),
        },
        {
            path: '/produk/create',
            component: () => import('@/pages/produk/CreatePage'),
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/produk/edit/:id',
            component: () => import('@/pages/produk/EditPage'),
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/kategori',
            component: () => import('@/pages/kategori/IndexPage'),
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/kategori/create',
            component: () => import('@/pages/kategori/CreatePage'),
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/kategori/edit/:id',
            component: () => import('@/pages/kategori/EditPage'),
            meta: {
                requiresAuth: true,
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            return next()
        }

        return next('/login')
    }

    return next()
})

export default router