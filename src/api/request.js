import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import qs from 'qs'
import store from '@/store'
// import { getToken, removeToken } from '@/utils/myAuth'
// import router from '@/router/index'
// create an axios instance
const service = axios.create({
    // baseURL: "http://www.loveenglishbook.com:8083",
    // baseURL: "http://121.41.118.230:8091", // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})
// request interceptor
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)
// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data
        return res;
    },
)
// 请求分为get/post
// axios对于get和post的参数的处理方式是不同的
function http(config) {
    if (config.method.toLowerCase() === 'post') {
        // 针对对象 是无法直接处理的 ; qs是一个js库,可以方便的对对象进行序列化处理
        // myAjax  {name:'zx',age:20} ==> name=zs&age=20
        config.data = qs.stringify(config.data, { arrayFormat: 'repeat', allowDots: true });
    } else {
        config.params = config.data;
    }
    return service(config);
}


export default http