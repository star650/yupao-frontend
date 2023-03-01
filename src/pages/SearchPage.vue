<template>
<!--    搜索框组件-->
    <form action="/">
        <van-search
                v-model="searchText"
                show-action
                placeholder="请输入要搜索的标签"
                @search="onSearch"
                @cancel="onCancel"
        />
    </form>
<!--分割线组件-->
    <van-divider content-position="left">已选标签</van-divider>
<!--activeIds:存放级联组件中右侧选中的id，支持数组-->
    <div v-if="activeIds.length === 0">请选择标签</div>

<!--    布局组件-->
    <van-row gutter="16" style="padding: 0 16px">
        <van-col v-for="tag in activeIds">
            <!--标签组件        @close表示当点击×时，触发的方法-->
            <van-tag closeable size="small" type="primary" @close="doClose(tag)">
                {{tag}}
            </van-tag>
        </van-col>
    </van-row>




    <!--分割线组件-->
    <van-divider content-position="left">选择标签</van-divider>

<!--级联组件，items属性即级联展示的数据 main-active-index:左侧选中项的索引;
                                  active-id:右侧选中项的 id，支持传入数组-->
    <van-tree-select
            v-model:active-id="activeIds"
            v-model:main-active-index="activeIndex"
            :items="tagList"
    />
    <div style="padding: 12px">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
    </div>

</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import {showToast} from "vant/lib/vant.es";
    import {useRouter} from "vue-router";


    const router = useRouter();

    //搜索框相关方法
    const searchText = ref('');

    //级联组件中的标签
    const originTagList = [
        {
            text: '性别',
            children: [
                { text: '男', id: '男' },
                { text: '女', id: '女' },
            ],
        },
        {
            text: '年级',
            children: [
                { text: '大一', id: '大一' },
                { text: '大二', id: '大二' },
                { text: '大三', id: '大三' },
                { text: '大四', id: '大四' },
            ],
        },
        {
            text: '段位',
            children: [
                { text: '初级', id: '初级' },
                { text: '中级', id: '中级' },
                { text: '高级', id: '高级' },
                { text: '王者', id: '王者' },
            ],
        },
    ];
    //ref的作用是让它变成一个可交互的taglist
    let tagList = ref(originTagList);

    /**
     * 搜索过滤标签
     * @param val
     */
    const onSearch = (val) => {
        tagList.value = originTagList.map(parentTag => {
            //[...   ]表示复制中括号内的元素
            const tempChildren = [...parentTag.children];
            const tempParentTag = {...parentTag};
            tempParentTag.children = tempChildren
                .filter(item => item.text.includes(searchText.value));
            return tempParentTag;
        });
    }
    //点击取消时，触发
    const onCancel = () => {
        searchText.value = '';
        tagList.value = originTagList;
    };

    //设置级联组件中已选中的标签，具体可查看vant3文档
    const activeIds = ref([]);
    const activeIndex = ref([]);



//    移除标签的方法
    const doClose = (tag) => {
        activeIds.value = activeIds.value.filter(item =>{
            return item !== tag;
        })
    }
//当点击搜索时触发的方法,跳转到搜索结果页,query携带参数：已选中的标签
    const doSearchResult = () =>{
        router.push({
            path: '/user/list',
            query:{
                tags:activeIds.value
            }
        })
    }


</script>

<style scoped>

</style>