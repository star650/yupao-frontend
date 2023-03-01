<template>
    <div id="teamPage">
<!--        搜索条组件,v-model表示双向绑定-->
        <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
<!--在标签指定 name 属性的情况下，v-model:active 的值为当前标签的 name-->
        <van-tabs v-model:active="active" @change="onTabChange">
            <van-tab title="公开" name="public"/>
            <van-tab title="加密" name="private"/>
        </van-tabs>

        <van-button type="primary" @click="toAddTeam" class="createTeamButton" icon="plus">创建队伍</van-button>
<!--        把TeamCardList.vue挂载在这里显示，TeamCardList的标签化可看为team-card-list，
            :teamList = "teamList"  表示给TeamCardList.vue标签传递一个值进行显示             -->
        <team-card-list :teamList = "teamList"/>

        <!--当队伍为空时显示的界面-->
        <van-empty v-if="!teamList || teamList.length < 1" description="搜素队伍不存在" />
        <van-button type="primary" @click="toAddTeam" class="createTeamButton" icon="plus">创建队伍</van-button>
    </div>
</template>

<script setup lang="ts">
// router可进行路由的跳转
import {useRouter} from "vue-router";
import myAxios from "../plugin/myAxios";
import TeamCardList from "../components/TeamCardList.vue";
import {ref} from "vue";
import {onMounted} from "vue";
import {showToast} from "vant/lib/vant.es";

const active = ref('public');

const searchText = ref('');

const router = useRouter();

//跳转到队伍加入页
    const toAddTeam =() =>{
        router.push({
            path:"/team/add"
        })
    }

const teamList = ref([]);
    //实现onTabChange方法,当点击切换tab栏时，触发这个方法
    const onTabChange = (name) =>{
    //    查公开
        if (name === 'public'){
            listTeam(searchText.value,0);
        }else {
        //    查加密
            listTeam(searchText.value,2);
        }

    }


/**
 * 搜索队伍，把这个方法单独抽离了出来，便于复用
 * @param val
 * @param status 传入队伍状态
 * @returns {Promise<void>}
 */
const listTeam = async (val = '',status=0) => {
    const res = await myAxios.get("/team/list", {
        //如果只携带这两个参数，代表在请求体中，就只给这两个字段赋值，其他的字段用默认值
        params: {
            searchText: val,
            pageNum: 1,
            status
        },
    });
    if (res?.code === 0) {
        teamList.value = res.data;
    } else {
        showToast('加载队伍失败，请刷新重试');
    }
}


//页面加载时，触发一次，请求后端接口，然后把后端接口返回值赋给teamList，进而传递给TeamCardList.vue
//返回所有队伍
onMounted(
    async () => {
        listTeam('');
    }
)
//当搜索队伍时，触发的方法，根据关键词搜索队伍
const onSearch = (val) => {
        listTeam(val);
};

</script>

<style scoped>
#teamPage{}



</style>