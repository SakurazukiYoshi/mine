/**
 * @desc 保存全局信息
 * 用户名、权限等
 */
import { getBreadCrumbList } from '@/libs/util'
import { api_login, api_logout, api_general } from '@/api'

const htmlEl = document.documentElement

const mediaTypes = [
{
    label: '网站',
    value: 'site',
    name:'ResourceSite',
}, {
    label: 'APP',
    value: 'app',
    name:'ResourceApp',
}, {
    label: '软件',
    value: 'soft',
    name:'ResourceSoft'
}]

export default {
    namespaced: true,
    state: {
        isMobile: null,
        screenWidth: 0,
        screenHeight: 0,
        breadCrumbList: [],
        userinfo: null,             // 用户信息
        mediaTypes,                 // 媒体类型
        menuType:1,
    },
    getters: {},
    mutations: {
        SET_DEVICE_TYPE(state, value) {
            state.isMobile = value;
        },
        SET_DEVICE_SCREEN(state) {
            state.screenWidth = htmlEl.clientWidth;
            state.screenHeight = htmlEl.clientHeight;
        },
        SET_BREAD_CRUMB(state, route) {
            state.breadCrumbList = getBreadCrumbList(route)
        },
        SET_USERINFO(state, payload) {
            state.userinfo = payload
        },
        SET_MENUTYPE(state, payload) {
            state.menuType = payload
        },
        CLEAR_USERINFO(state) {
            state.userinfo = null
        }
    },
    actions: {
        HandleSetDeviceType({ commit }) {
            return commit('SET_DEVICE_TYPE', document.body.clientWidth < 768 ? true : false);
        },
        HandleSetDeviceScreen({ commit }) {
            return commit('SET_DEVICE_SCREEN');
        },
        AutoLogin: ({commit}) => new Promise((resolve, reject) => {
            api_login.getUersInfo({url:'/user/baseInfo.json'})
                .then(res =>{
                    resolve(res.data);
                    commit('SET_USERINFO',res.data);
                })
                .catch(err => {
                    return reject(err)
                })
        }),
        DoLogin: ({ commit }, data) => new Promise((resolve, reject) => {
            api_login.login({data,url:'/login/do.json',noDialog:true})
                .then((res) => {
                    resolve(res);
                })
                .catch(err => reject(err))
        }),
        DoLogout: ({ commit }) => new Promise(resolve => {
            api_login.logout({url:'/login/logout.json'})
                .then(_ => {
                    commit('CLEAR_USERINFO');
                    resolve()
                })
        }),
        setMenu: ({commit},data) =>{
            commit('SET_MENUTYPE',data)
        },
    }
}
