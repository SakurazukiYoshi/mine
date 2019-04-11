const Main = () => import(/* webpackChunkName: "main" */ '@/components/main');

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
        path: '/login',
        name: 'login',
        meta: {
            title: 'Login - 登录',
            hideInMenu: true
        },
        component: () =>
            //import ('@/view/login/login.vue')
            import(/* webpackChunkName: "login" */ '@/view/login/login.vue')
    },
    {
        path: '/',
        name: '_home',
        redirect: '/agentIndex',
        component: Main,
        meta: {
            hideInMenu: true,
            notCache: true
        },
        children: [
            {
                path: '/agentIndex',
                name: 'agentIndex',
                meta: {
                    hideInMenu: true,
                    title: '代理商首页',
                    icon: 'md-ui'
                },
                component: () =>
                    import(/* webpackChunkName: "user" */ '@/view/page/agentIndex')
            },
            {
                path: '/agentList',
                name: 'agentList',
                meta: {
                    hideInMenu: true,
                    title: '代理商列表',
                    icon: 'md-ui'
                },
                component: () =>
                    import(/* webpackChunkName: "user" */ '@/view/page/agentList')
            },
            {
                path: '/agentAdvertise',
                name: 'agentAdvertise',
                meta: {
                    hideInMenu: true,
                    title: '广告商列表',
                    icon: 'md-ui'
                },
                component: () =>
                    import(/* webpackChunkName: "user" */ '@/view/page/agentAdvertise')
            },
            {
                path: '/agentFinance',
                name: 'agentFinance',
                meta: {
                    hideInMenu: true,
                    title: '财务信息',
                    icon: 'md-ui'
                },
                component: () =>
                    import(/* webpackChunkName: "user" */ '@/view/page/agentFinance')
            },
            {
                path: '/agentLog',
                name: 'agentLog',
                meta: {
                    hideInMenu: true,
                    title: '操作日志',
                    icon: 'md-ui'
                },
                component: () =>
                    import(/* webpackChunkName: "user" */ '@/view/page/agentLog')
            },
            {
                path: '/advertiserIndex',
                name: 'advertiserIndex',
                meta: {
                    hideInMenu: true,
                    title: '广告商首页',
                    icon: 'md-ui'
                },
                component: () =>
                    import(/* webpackChunkName: "user" */ '@/view/page/advertiserIndex')
            },
            {
                path: '/advertiserFinance',
                name: 'advertiserFinance',
                meta: {
                    hideInMenu: true,
                    title: '广告商财务信息',
                    icon: 'md-ui'
                },
                component: () =>
                    import(/* webpackChunkName: "user" */ '@/view/page/advertiserFinance')
            },
            {
                path: '/advertiserUser',
                name: 'advertiserUser',
                meta: {
                    hideInMenu: true,
                    title: '广告商账户信息',
                    icon: 'md-ui'
                },
                component: () =>
                    import(/* webpackChunkName: "user" */ '@/view/page/advertiserUser')
            },
            {
                path: '/home',
                name: 'home',
                meta: {
                    hideInMenu: true,
                    title: '系统首页',
                    icon: 'md-home'
                },
                component: () =>
                    //import ('@/view/page/home')
                    import(/* webpackChunkName: "home" */ '@/view/page/home')
            },
            {
                path: '/agent',
                name: 'agent',
                meta: {
                    hideInMenu: true,
                    title: '媒体商管理',
                    icon: 'md-home'
                },
                component: () =>
                    //import ('@/view/page/agent')
                    import(/* webpackChunkName: "agent" */ '@/view/page/agent')
            },
            {
                path: '/resource',
                name: 'resource',
                meta: {
                    hideInMenu: true,
                    title: '媒体管理',
                    icon: 'md-home'
                },
                component: () =>
                    //import ('@/view/page/resource')
                    import(/* webpackChunkName: "resource" */ '@/view/page/resource')
            },
            {
                path: '/zone',
                name: 'zone',
                meta: {
                    hideInMenu: true,
                    title: '广告位管理',
                    icon: 'md-home'
                },
                component: () =>
                    //import ('@/view/page/zone')
                    import(/* webpackChunkName: "zone" */ '@/view/page/zone')
            },
            {
                path: '/report',
                name: 'report',
                meta: {
                    hideInMenu: true,
                    title: '数据统计',
                    icon: 'md-home'
                },
                component: () =>
                    //import ('@/view/page/report')
                    import(/* webpackChunkName: "zone" */ '@/view/page/report')
            },
            {
                path: '/AdPlan',
                name: 'AdPlan',
                meta: {
                    hideInMenu: true,
                    title: '广告计划',
                    icon: 'md-home'
                },
                component: () =>
                    //import ('@/view/page/report')
                    import(/* webpackChunkName: "zone" */ '@/view/page/AdPlan')
            },
            {
                path: '/AdGroup',
                name: 'AdGroup',
                meta: {
                    hideInMenu: true,
                    title: '广告组',
                    icon: 'md-home'
                },
                component: () =>
                    //import ('@/view/page/report')
                    import(/* webpackChunkName: "zone" */ '@/view/page/AdGroup')
            },
            {
                path: '/AdCreates',
                name: 'AdCreates',
                meta: {
                    hideInMenu: true,
                    title: '广告创意',
                    icon: 'md-home'
                },
                component: () =>
                    //import ('@/view/page/report')
                    import(/* webpackChunkName: "zone" */ '@/view/page/AdCreates')
            },
            {
                path: '/financial',
                name: 'financial',
                meta: {
                    hideInMenu: true,
                    title: '财务信息',
                    icon: 'md-home'
                },
                component: () =>
                    //import ('@/view/page/financial')
                    import(/* webpackChunkName: "financial" */ '@/view/page/financial')
            },
            {
                path: '/ui',
                name: 'ui',
                meta: {
                    hideInMenu: true,
                    title: 'UI规范',
                    icon: 'md-ui'
                },
                component: () =>
                    //import ('@/view/page/ui')
                    import(/* webpackChunkName: "ui" */ '@/view/page/ui')
            },
            {
                path: '/user',
                name: 'user',
                meta: {
                    hideInMenu: true,
                    title: '用户',
                    icon: 'md-ui'
                },
                component: () =>
                    //import ('@/view/page/ui')
                    import(/* webpackChunkName: "user" */ '@/view/page/user')
            },
            {
                path: '/test',
                name: 'test',
                meta: {
                    hideInMenu: true,
                    title: '用户',
                    icon: 'md-ui'
                },
                component: () =>
                    //import ('@/view/page/ui')
                    import(/* webpackChunkName: "user" */ '@/view/page/test')
            },
        ]
    }
]
