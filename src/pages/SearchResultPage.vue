<template>
<!--    输出具体的符合标签的用户-->
    <user-card-list :user-list = "userList" :loading="loading"/>
        <!--当搜索结果为空时显示的界面-->
    <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />
</template>

<script setup lang="ts">


    import {useRoute} from "vue-router";
    import myAxios from "../plugin/myAxios";
    import qs from 'qs';
    import {onMounted} from "vue";
    import {ref} from "vue";
    import UserCardList from "../components/UserCardList.vue";

    const route = useRoute();
    //获取请求这个界面的路由的携带的参数
    const {tags} = route.query;
    //声明符合标签的数组
    const userList = ref([]);
    //定义一个loading值传递给UserCardList组件，
    // 在get方法执行前设置loading=true,在get方法执行后设置loading=false
    const loading = ref(true);




    //使用钩子:onMounted，当页面元素加载好之后执行
    onMounted(async () => {
        loading.value = true;
// 发送请求,根据标签获取用户，await就是等请求完全执行结束
      const userListData = await myAxios.get('/user/search/tags',{
            params: {
                tagNameList:tags
            },
            //对参数进行序列化
            paramsSerializer: {
                serialize:function(params) {
                    return qs.stringify(params, { indices: false })
                }
            }
        })
        //    下面的总会执行,类似Java中的finally
        .then(function (response) {
                // handle success
                console.log('/user/search/tags succeed',response);
                console.log(response.data);
                console.log("1111")
                //成功获取到用户之后记得return
                return response?.data;
        })
        .catch(function (error) {
                // handle error
                console.log('/user/search/tags fail',error);

            })
        //如果获取到符合标签的用户，就存到userList中
        if (userListData){
            userListData.forEach(user => {
                if (user.tags){
                    //解析 JSON 字符串，获取想要的字符串
                    user.tags = JSON.parse(user.tags);
                }
            })
            userList.value = userListData;
        }
        loading.value = false;
    })


</script>

<style scoped>

</style>