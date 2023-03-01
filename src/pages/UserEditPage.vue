<template>
<!-- 表单组件-->
    <van-form @submit="onSubmit">
            <van-field
                    v-model="editUser.currentValue"
                    :name="editUser.editKey"
                    :label="editUser.editName"
                    :placeholder="`请输入${editUser.editName}`"
            />

        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>

</template>
<script setup lang="ts">
// useRoute携带当前页面的路由信息，可以使用route.query获取跳转到当前页面的路由中 携带的参数




import {ref} from 'vue';

import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugin/myAxios";
// import {showToast} from "vant";

import {getCurrentUserState} from "../states/user";
    //这个能进行路径的跳转
    const router = useRouter();
     //能获取当前页面的路由
     const route = useRoute();

    //声明一个user，以用来获取传来的参数,虽然只有一个属性有值，但这个仍然是User对象
        const editUser = ref({
        editKey: route.query.editKey,
        editName:route.query.editName,
        currentValue: route.query.currentValue
    })
    //当提交表单时，触发的方法 把数据提交给后端
    const onSubmit = async () =>{
       //    获取用户信息
       const currentUser = getCurrentUserState();
       if (!currentUser){
           // showToast('用户未登录');
           return ;
       }

       const res = await myAxios.post('/user/update',{
           //带上id,和一个属性值，可以看成是一个User对象
           'id': currentUser.id,
           //中括号表示这个值是一个变量, as string表示给它声明一个类型，避免 空类型 报错
           [editUser.value.editKey as string]:editUser.value.currentValue,
           }
       )
        console.log(res,'更新请求');
       if (res.code === 0 && res.data > 0){
           // Toast.success('修改成功');
           //修改之后返回
           router.back();
       }else {
           // Toast.fail('修改错误');
       }
    };

</script>

<style scoped>

</style>