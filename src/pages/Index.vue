<template>
<!--    开关组件-->
    <van-cell center title="心动模式">
        <template #right-icon>
            <van-switch v-model="isMatchMode" size="24" />
        </template>
    </van-cell>

    <!--    输出具体的符合标签的用户，user-list等同于userList,
    user-card-list也等同于UserCardList,userList就是传递给UserCardList.vue组件的值
    把loading的值传递给UserCardList-->
    <user-card-list :user-list = "userList" :loading="loading"/>
    <!--当搜索结果为空时显示的界面-->
    <van-empty v-if="!userList || userList.length < 1" description="数据为空" />
</template>

<script setup lang="ts">
    import {useRoute} from "vue-router";
    import myAxios from "../plugin/myAxios";
    import {onMounted} from "vue";
    import {ref} from "vue";
    import UserCardList from "../components/UserCardList.vue";
    import {showToast} from "vant/lib/vant.es";
    import {UserType} from "../models/user";
    import {watchEffect} from "vue";


    const route = useRoute();
    //获取请求这个界面的路由的携带的参数
    const {tags} = route.query;
    //声明符合标签的数组,存放用户列表
    const userList = ref([]);
    //定义一个loading值传递给UserCardList组件，
    // 在loadData方法执行前设置loading=true,在loadData方法执行后设置loading=false
    const loading = ref(true);

    //定义一个 匹配模式 开关 切换常量，默认为false关闭
    const isMatchMode = ref<boolean>(false);

//     //使用钩子:onMounted，当页面元素加载好之后执行
//     onMounted(async () => {
// // 发送请求,获取推荐用户，await就是等请求完全执行结束
//         const userListData = await myAxios.get('/user/recommend',{
//             params: {
//                 pageSize:8,
//                 pageNum:1,
//             },
//         })
//             //    下面的总会执行,类似Java中的finally
//             .then(function (response) {
//                 // handle success
//                 console.log('/user/recommend succeed',response);
//                 console.log(response.data);
//                 console.log("1111")
//                 //成功获取到用户之后记得return
//                 return response?.data?.records;
//             })
//             .catch(function (error) {
//                 // handle error
//                 console.log('/user/recommend fail',error);
//
//             })
//         //如果获取到符合标签的用户，就存到userList中
//         if (userListData){
//             userListData.forEach(user => {
//                 if (user.tags){
//                     //解析 JSON 字符串，获取想要的字符串
//                     user.tags = JSON.parse(user.tags);
//                 }
//             })
//             userList.value = userListData;
//         }
//
//     })

    /**
     * 加载数据
     */
    const loadData = async () => {
        let userListData;
        loading.value = true;
        // 如果开启心动模式，就访问后端接口，根据标签匹配用户
        if (isMatchMode.value) {
            //匹配出的用户数
            const num = 10;
            userListData = await myAxios.get('/team/match', {
                params: {
                    num,
                },
            })
                //    下面的总会执行,类似Java中的finally
                .then(function (response) {
                    console.log('/user/match succeed', response);
                    return response?.data;
                })
                .catch(function (error) {
                    console.error('/user/match error', error);
                    showToast('请求失败');
                })
        } else {
            // 普通模式，直接分页查询用户
            userListData = await myAxios.get('/user/recommend', {
                params: {
                    pageSize: 8,
                    pageNum: 1,
                },
            })
                .then(function (response) {
                    console.log('/user/recommend succeed', response);
                    return response?.data?.records;
                })
                .catch(function (error) {
                    console.error('/user/recommend error', error);
                    showToast('请求失败');
                })
        }
        //把返回的json格式的标签解析为字符串
        if (userListData) {
            userListData.forEach((user: UserType) => {
                if (user.tags) {
                    user.tags = JSON.parse(user.tags);
                }
            })
            userList.value = userListData;
        }
        loading.value = false;
    }

    //vue中的写法，监听变量的变化，变量一旦变化，就会调用函数，不用绑定，默认监听变量
    watchEffect(() => {
        loadData();
    })


</script>

<style scoped>


</style>