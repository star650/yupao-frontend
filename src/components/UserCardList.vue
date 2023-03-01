<template>
<!--使用骨架屏特效包裹用户卡片，在内容加载过程中展示一组占位图形。形成正在加载的效果
       :loading的值为true时，开始展示占位图形，为false时，结束展示占位图形-->
    <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
    <van-card
            :desc="user.profile"
            :title="`${user.username}(${user.planetCode})`"
            :thumb="user.avatarUrl"
    >
        <!--展示标签-->
        <template #tags>
            <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px;margin-top: 8px">
                {{tag}}
            </van-tag>
        </template>
        <template #footer>
            <van-button size="mini">联系我</van-button>
        </template>
    </van-card>
    </van-skeleton>
</template>

<script setup lang="ts">
    import {UserType} from "../models/user";
    import {defineProps} from "@vue/runtime-core";

    //   定义UserCardListProps接口的属性
    interface UserCardListProps{
        loading: boolean;
        userList: UserType[]
    }

   //  把类型作为一个泛型，这样props就能得到父组件传递的属性，比如userList，loading
   // withDefaults函数的作用，就是给属性赋一个默认值
   const props = withDefaults(defineProps<UserCardListProps>(),{
        userList:[] as UserType[],
       loading:true
   });


</script>

<style scoped>

</style>