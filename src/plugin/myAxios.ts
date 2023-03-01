
// Set config defaults when creating the instance
import axios from "axios";
import {showToast} from "vant/lib/vant.es";

const isDev = process.env.NODE_ENV === 'development';

//创建一个axios对象实例,baseURL表示要发送请求的地址
const myAxios = axios.create({
    baseURL: isDev ? 'http://localhost:8080/api':'http://124.221.161.57:8080/api'
});


//这个配置表示axios向后端发送请求时，要携带cookie凭证
myAxios.defaults.withCredentials = true;

// 添加一个请求拦截器
myAxios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log('我要发请求了',config)
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 添加一个响应拦截器，收到后端的响应之后触发
myAxios.interceptors.response.use(function (response) {
    // Do something with response data
    showToast('我收到你的响应了',response);
    //未登录则跳转到登录页
    if(response?.data?.code === 40100){
        //声明我们要重定向的地址，就是未登录时当前页面的地址，
        // 把我们要重定向的地址传递过去，
        // const redirectUrl = window.location.href;
        // window.location.href = `/user/login?redirect=${redirectUrl}`;

        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }


    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default myAxios;