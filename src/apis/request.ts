//axiosInstance.js
//导入axios
import axios from 'axios';
import { message } from 'ant-design-vue';

//使用axios下面的create([config])方法创建axios实例，其中config参数为axios最基本的配置信息。
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // 所有的请求地址前缀部分
  timeout: 60000, // 请求超时时间毫秒, 默认一分钟
  withCredentials: true, // 异步请求携带cookie
  headers: {
    // 设置后端需要的传参类型
    'Content-Type': 'application/json',
    // 'Authorization': bearerToken,
    'X-Requested-With': 'XMLHttpRequest',
  },
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 请求携带本地缓存token到后端进行鉴权认证
    if (typeof config.headers !== 'undefined') {
      config.headers['token'] = localStorage.getItem('access_token');
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的, 假设10000为请求成功状态
    if (dataAxios.code === 10000)
      return dataAxios;
    // 请求业务异常
    else {
      // 输出异常信息
      message.error(dataAxios.message, 2).then(() => {
        // 异常后统一做点什么
        return;
      });
    }
  },
  // http状态码异常
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // 500错误
    if (error.response.status === 500) {
      message.error("服务器响应失败", 2).then(() => {
        localStorage.removeItem('access_token');
      });
    }
    // todo ...
    return Promise.reject(error)
  }
)

//导出我们建立的axios实例模块，ES6 export用法
export default service
