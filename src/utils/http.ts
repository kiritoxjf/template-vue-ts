// src/utils/https.ts
import { useRouterStore } from '@/stores/router'
import type { iRes } from '@/interfaces/common'
import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse
} from 'axios'

// Axios实例
const instance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000, // 超时时间 10秒
  withCredentials: true
})

// 请求拦截器
instance.interceptors.request.use((config) => {
  // 请求前的操作
  // 携带Token
  return config
})

// 响应拦截器
instance.interceptors.response.use(
  <T>(response: AxiosResponse<iRes<T>>): AxiosResponse<iRes<T>> | Promise<T> => {
    // if (异常处理) {
    //   useRouterStore().router?.push('/login')
    //   return Promise.reject(response.data)
    // }
    return response // 保持 `AxiosResponse` 结构，避免 TS 报错
  },
  (error: AxiosError) => Promise.reject(error) // 统一错误处理
)

type iHttpType = 'GET' | 'POST' | 'PUT' | 'DELETE'

// 封装 Axios T 传参类型  R 返回值类型
export const http = async <T, R>(
  method: iHttpType,
  url: string,
  params?: T,
  config?: AxiosRequestConfig
): Promise<iRes<R>> => {
  try {
    let response: AxiosResponse<iRes<R>>

    if (method === 'GET' || method === 'DELETE') {
      response = await instance[method.toLowerCase() as 'get' | 'delete'](url, {
        ...config,
        params
      })
    } else {
      response = await instance[method.toLowerCase() as 'post' | 'put'](url, params, {
        headers: { 'Content-Type': 'application/json' },
        ...config
      })
    }

    return response.data // 确保最终返回 `iRes<R>`
  } catch (error) {
    return Promise.reject(error)
  }
}
