// 财务信息相关接口
import { get, post, put, del } from './restful'
/**
 * @desc 获取当前用户余额信息
 */
export const getAderAccount = () => {
    return new Promise((resolve, reject) => {
        get({url:'/aderAccount/info.json'})
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
};
/**
 * @desc 获取主页消费概述
 */
export const getExpendAccount = (data) => {
    return new Promise((resolve, reject) => {
        get({url:'/reportAder/overview.json',data})
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
};
