import { createRouter, createWebHashHistory, RouteRecordRaw, RouterOptions } from "vue-router";

import Adaptor from "@/views/Adaptor.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Adaptor',
        component: Adaptor
    },
    {
        path: '/desktop',
        name: 'Desktop',
        component: () => import("@/views/Desktop.vue")
    },
    {
        path: '/mobile',
        name: 'Mobile',
        component: () => import("@/views/Mobile.vue")
    },
]

const routerOptions: RouterOptions = {
    history: createWebHashHistory(),
    routes
}

export const router = createRouter(routerOptions)
