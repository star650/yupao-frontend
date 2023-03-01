<template>
<!--    用户信息页  当user存在的时候，才显示这些信息，否则不显示-->
    <template v-if="user">

    <!--    cell组件-->
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('username','昵称',user.username)"/>
    <van-cell title="账号" :value="user.userAccount"/>
    <van-cell title="头像" is-link to="/user/edit" @click="toEdit('avatarUrl','头像',user.avatarUrl)">
        <img style="height: 48px" :src="user.avatarUrl"/>
    </van-cell>
    <!--@click触发当点击时触发的方法 -->
    <van-cell title="性别" is-link to="/user/edit" :value="user.gender" @click="toEdit('gender','性别',user.gender)"/>
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone"  @click="toEdit('phone','电话',user.phone)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email"  @click="toEdit('email','邮箱',user.email)"/>
    <van-cell title="星球编号" :value="user.planetCode"/>
    <van-cell title="注册时间" :value="user.createTime"/>

    </template>
</template>

<script setup lang="ts">
    import {ref,onMounted} from "vue";
    import {useRouter} from "vue-router";
    import myAxios from "../plugin/myAxios";
    import Toast from "@vant/weapp/lib/toast/toast";
    import {showToast} from "vant";
    import {getCurrentUser} from "../services/user";

    //    定义一个假数据
    // const user = {
    //     id: 1,
    //     username: '鱼皮',
    //     userAccount: 'dogYupi',
    //     avatarUrl: 'https://cn.bing.com/',
    //     gender: '男',
    //     phone: '13366',
    //     email: '13366',
    //     planetCode: '13366',
    //     createTime: new Date(),
    // }

    //声明当前用户
    const user = ref();
    //向后端获取当前登录用户信息,
    onMounted(async () =>{
     const res = await getCurrentUser();
        if (res){
            //如果存在就给当前页面的user进行赋值
            user.value = res;
            // Toast.success('获取当前用户成功');
            console.log('获取当前用户成功');
        }else {
            // Toast.fail('获取当前用户失败');
            console.log('获取当前用户失败');
        }
    })




    const router = useRouter();
    //    当点击个人信息页某一项内容时，跳转的方法，query表示携带的参数
    const toEdit = (editKey: string,editName: string, currentValue: string) => {
        router.push({
            path: '/user/edit',
            query: {
                //key,名称，value
                editKey,
                editName,
                currentValue,
            }
        })
    }

</script>

<style scoped>

</style>