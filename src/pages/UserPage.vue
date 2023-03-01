<template>
<!--    用户信息页  当user存在的时候，才显示这些信息，否则不显示-->
    <template v-if="user">
        <template v-if="user">
            <van-cell title="当前用户" :value="user?.username" />
            <van-cell title="修改信息" is-link to="/user/update" />
            <van-cell title="我创建的队伍" is-link to="/user/team/create" />
            <van-cell title="我加入的队伍" is-link to="/user/team/join" />
        </template>

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