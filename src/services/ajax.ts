import { message } from 'antd'
import axios from 'axios'

const instance = axios.create({
    timeout: 10 * 1000,
})
// request 拦截：每次请求都带上 token
instance.interceptors.request.use(
    config => {
        // JWT 的固定格式
        config.headers['Authorization'] = `Bearer `
        return config
    },
    error => Promise.reject(error)
)

// response 拦截：统一处理 errno 和 errmsg
instance.interceptors.response.use(res => {
    const resData = (res.data || {}) as ResType
    const { errno, data, msg } = resData
    if (errno !== 0) {
        msg && message.error(msg)
        throw new Error(msg || '网络出错')
    }
    return data as any
})
export default instance

export type ResType = {
    errno: number
    data?: ResDataType
    msg?: string
}

export type ResDataType = {
    [key: string]: any
}
