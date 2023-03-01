<template>
<!--  引入上面的导航-->
  <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <!--插槽-->
      <template #right>
        <van-icon name="search" size="18" />
      </template>
  </van-nav-bar>

<!--  实现页面的切换，-->
 <div id="content">
     <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view />

 </div>


<!--引入下面的导航-->
  <van-tabbar route @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>

</template>

<!--加上setup就不用写return了-->
<script setup lang="ts">

import { ref } from "vue";
import { Toast} from "vant";
import {showToast} from "vant/lib/vant.es";
import {useRouter} from "vue-router";
import routes from "../config/route";

const router = useRouter();

const DEFAULT_TITLE = '伙伴匹配';
const title = ref(DEFAULT_TITLE);

/**
根据路由切换标题
 */
router.beforeEach(
    (to,from) => {
        //获取  即将访问的页面 的访问路径
        const toPath = to.path;
 //遍历route.ts文件中的routes(即路由和组件的映射关系)，找到 即将访问的页面  对应的路由关系
 // routes(即路由和组件的映射关系) 中每一条都包含每一个页面的title值
        const route = routes.find((route) => {
            return toPath == route.path;
        })
        //取到之后赋给title
        title.value = route?.title ?? DEFAULT_TITLE;
    }
)


const onClickLeft = () => {
    //路径跳转
    router.back();
};

const onClickRight = () => {
    //路径跳转
    router.push('/search');
};

//底部导航栏相关属性，记得alter+enter引入
// const active = ref("index");

// const onChange = (index) => showToast(`标签 ${index}`);

</script>

<style scoped>
    #content {
        padding-bottom: 80px;
    }
</style>