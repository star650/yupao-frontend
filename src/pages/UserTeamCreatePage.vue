<template>
    <div id="teamPage">
        <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
        <van-button type="primary" @click="toAddTeam">创建队伍</van-button>
<!--        展示队伍-->
        <team-card-list :teamList="teamList" />
        <van-empty v-if="teamList?.length < 1" description="数据为空"/>
    </div>
</template>

<script setup lang="ts">

    import {useRouter} from "vue-router";
    import TeamCardList from "../components/TeamCardList.vue";
    import {onMounted, ref} from "vue";
    import myAxios from "../plugin/myAxios";
    import {Toast} from "vant";

    const router = useRouter();
    const searchText = ref('');

    // 跳转到创建队伍页
    const toAddTeam = () => {
        router.push({
            path: "/team/add"
        })
    }

    const teamList = ref([]);

    /**
     * 搜索队伍，在我创建的队伍中搜索
     * @param val
     * @returns {Promise<void>}
     */
    const listTeam = async (val = '') => {
        const res = await myAxios.get("/team/list/my/create", {
            params: {
                searchText: val,
                pageNum: 1,
            },
        });
        if (res?.code === 0) {
            teamList.value = res.data;
        } else {
            Toast.fail('加载队伍失败，请刷新重试');
        }
    }

    // 页面加载时只触发一次，展示我创建的所有队伍
    onMounted( () => {
        listTeam();
    })
    //展示所有符合搜索条件的我创建的队伍
    const onSearch = (val) => {
        listTeam(val);
    };

</script>

<style scoped>
    #teamPage {

    }
</style>