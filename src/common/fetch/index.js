import axios from 'axios'
import { baseUrl } from '@/common/config'
import router from '@/router'
import { Dialog } from '_c/dialog'

export default function (options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: baseUrl,
            timeout: 10E3,
            headers: {
                'Content-Type': 'application/json'
            },
        })
        instance.interceptors.request.use(
            options => options,
            error => Promise.reject(error)
        )

        instance.interceptors.response.use(
            response => {
                let { data } = response;
                if (data.code === 401) {
                    // 登陆失效
                    router.push('/login');
                    reject(response)
                } else if (data.code === 422) {
                    // 登陆失败
                    reject(data.info)
                } else if (data.code === 200) {
                    resolve(data)
                } else {
                    if(options.noDialog===true){
                        reject(response)
                        return false;
                    }
                    Dialog({ type: 'error', text: data.msg });
                    reject(response)
                }
            },
            error => {
                if(options.noDialog===true){
                    reject(error.response.data);
                    return false;
                }
                Dialog({ type: 'error', text: error.response.data });
                reject(error.response.data);
                // error.response.data && reject(error.response.data)
            }
        )
        instance(options)
    })
}




