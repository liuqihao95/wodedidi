import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/view/layout/index'

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/admin',
        name: '首页',
        redirect: '/news',
        component: layout,
        children: [{
            path: '/news',
            name: '新闻列表页',
            component: () => import ('@/view/news/list'),
        },
            {
                path: '/news/add',
                name: '新闻添加页',
                component: () => import ('@/view/news/add'),
            },
            {
                path: '/news/editor',
                name: '新闻编辑页',
                component: () => import ('@/view/news/add'),
            },
            {
                path: '/project',
                name: '工程案例',
                component: () => import ('@/view/project/list'),
            },
            {
                path: '/project/add',
                name: '工程案例添加页',
                component: () =>
                    import ('@/view/project/add'),
            },
            {
                path: '/project/editor',
                name: '工程案例编辑页',
                component: () => import ('@/view/project/add'),
            },
            {
                path: '/lunbo',
                name: '轮播图管理',
                component: () => import ('@/view/lunbo/list'),
            },
            {
                path: '/lunbo/add',
                name: '轮播图添加',
                component: () => import ('@/view/lunbo/add'),
            },
            {
                path: '/lunbo/editor',
                name: '轮播图编辑',
                component: () => import ('@/view/lunbo/add'),
            },
            {
                path: '/user',
                name: '用户管理',
                component: () => import ('@/view/user/list'),
            },
        ]
    },
    {
        path: '/',
        name: '登录页面',
        component: () => import ('@/view/login'),
    },
    ]
})
