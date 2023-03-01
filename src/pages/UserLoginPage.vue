<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
<!--            用v-model实现界面和数据的双向绑定，界面上进行值的修改，该数据也会修改-->
            <van-field
                    v-model ="userAccount"
                    name="userAccount"
                    label="账号"
                    placeholder="请输入账号"
                    autocomplete="off"
                    :rules="[{ required: true, message: '请填写账号' }]"
            />
<!--            type，声明类型，可以把密码变成*-->
            <van-field
                    v-model="userPassword"
                    type="password"
                    name="userPassword"
                    label="密码"
                    placeholder="请输入密码"
                    autocomplete="off"
                    :rules="[{ required: true, message: '请填写密码' }]"
            />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>


</template>

<script setup lang="ts">

    import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugin/myAxios";
import {ref} from 'vue';
import {showToast} from "vant/lib/vant.es";



    //这个能进行路径的跳转
    const router = useRouter();
    const route = useRoute();
//    默认值都是空字符串
    const userAccount = ref('');
    const userPassword = ref('');

    //当点击提交时，发送给后端
    const onSubmit = async () => {
    const res = await myAxios.post('/user/login',{
        userAccount: userAccount.value,
        userPassword: userPassword.value,
    })

    console.log(res, '用户登录');
    if (res.code === 0 && res.data){
        // Toast.success('登录成功');
    //    push：在当前的页面历史记录中又压入了一条新的记录，如果点后退，回到登录界面
    // replace:在当前的页面历史记录中替换掉当前的记录，再点后退就不会返回登录页了，而是返回登录页前的那一页
        showToast('登录成功');
        //登录成功之后，获取路由中的redirectUrl的值，并跳转
        const redirectUrl = route.query?.redirect ?? '/';
        window.location.href = redirectUrl;
    }else {
       // Toast.fail('登录失败');
        showToast('登录失败');
    }


};


</script>

<style scoped>

</style>