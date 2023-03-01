<template>
<!--    .这里thumb我们引入了图片,我们可以完善从后端获取-->
    <van-card
            v-for="team in props.teamList"
            :thumb="henu"
            :desc="team.description"
            :title="`${team.name}`"
    >
        <!--展示队伍状态-->
        <template #tags>
            <van-tag plain type="danger"  style="margin-right: 8px;margin-top: 8px">
                {{teamStatusEnum[team.status]}}
            </van-tag>
        </template>

        <!--使用template插槽在这显示部分数据，为了更美观-->
        <template #bottom>
            <div>
                {{ `队伍人数: ${team.hasJoinNum}/${team.maxNum}`}}
            </div>
            <div v-if="team.expireTime">
                {{ '过期时间: ' + team.expireTime }}
            </div>
            <div>
                {{ '创建时间: ' + team.createTime }}
            </div>
        </template>

        <template #footer>
<!--                                如果是队伍创建者，或者已经加入队伍就看不到 加入队伍 按钮-->
            <van-button size="small" type="primary" v-if="team.userId !== currentUser?.id && !team.hasJoin" plain @click="preJoinTeam(team)">加入队伍</van-button>
<!--            只有队伍的创建人才能看到这个更新队伍信息的按钮-->
            <van-button v-if="team.userId === currentUser?.id" size="small" type="primary" plain
                        @click="doUpdateTeam(team.id)">更新队伍信息
            </van-button>
<!--                仅加入队伍可见，创建人不可见-->
            <van-button size="small" type="primary" v-if="team.userId !== currentUser?.id && team.hasJoin" plain @click="doQuitTeam(team.id)">退出队伍</van-button>
            <!--            只有队伍的创建人才能看到这个更新队伍信息的按钮-->
            <van-button v-if="team.userId === currentUser?.id" size="small" type="danger" plain
                        @click="doDeleteTeam(team.id)">解散队伍
            </van-button>
        </template>
    </van-card>
<!--    定义一个弹出框，用于填写加密队伍的密码-->
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
        <van-field v-model="password" placeholder="请输入密码"/>
    </van-dialog>

</template>

<script setup lang="ts">
    import henu from "../assets/henu.jpg";
    import {TeamType} from "../models/team";
    import {onMounted} from "vue";
    import {ref} from "vue";
    import {defineProps} from "@vue/runtime-core";
    import {teamStatusEnum} from "../constants/teamStatusEnums";
    import myAxios from "../plugin/myAxios";
    import {getCurrentUserState} from "../states/user";
    import { getCurrentUser } from "../services/user";
    import {useRouter} from "vue-router";
    import {showToast} from "vant/lib/vant.es";
    //   定义teamList的类型
    interface TeamCardListProps{
        teamList: TeamType[]
    }

    //这个变量来决定van-dialog弹出框是否弹出
    const showPasswordDialog = ref(false);
    //这个变量存储 在弹出框中输入的队伍密码
    const password = ref('');
    //这个变量存储要加入队伍的id，默认是0，当点击加入某个队伍时，把这个队伍的id赋给这个变量
    const joinTeamId = ref(0);

    //进行界面的跳转
    const router = useRouter();

   //  把类型作为一个泛型，这样props就能得到父组件传递的属性，比如teamList
   // withDefaults函数的作用，就是给属性赋一个默认值
   const props = withDefaults(defineProps<TeamCardListProps>(),{
        teamList:[],
   });

    //获取当前登录用户信息
    const currentUser = ref();
    onMounted(async () =>{
        currentUser.value = await getCurrentUser();
    })



    /**
     * 判断是不是加密房间，是的话显示密码框
     * @param team
     */
    const preJoinTeam = (team: TeamType) => {
        //获取当前队伍id
        joinTeamId.value = team.id;
        //获取队伍状态并进行判断，如果是公开队伍直接调用加入队伍方法
        if (team.status === 0) {
            doJoinTeam();
        } else {
            //如果是加密队伍，弹出弹框
            showPasswordDialog.value = true;
        }
    }
    //取消加入
    const doJoinCancel = () => {
        joinTeamId.value = 0;
        password.value = '';
    }

    /**
     * 加入队伍
     */
    const doJoinTeam = async () => {
        //如果传来的队伍id不存在，直接return
        if (!joinTeamId.value){
            return;
        }
        //无论有没有密码，都可以使用这个方法，没有密码就为null，后端接受参数是一个请求体（队伍id，密码）
        const res = await myAxios.post('/team/join', {
            teamId: joinTeamId.value,
            password: password.value
        });
        if (res?.code === 0) {
            showToast('加入成功');
            doJoinCancel();
        } else {
            showToast('加入失败' + (res.description ? `，${res.description}` : ''));
        }
    }

    /**
     * 跳转至更新队伍页
     * @param id
     */
    const doUpdateTeam = (id: number) => {
        router.push({
            path: '/team/update',
            query: {
                id,
            }
        })
    }

    /**
     * 退出队伍
     * @param id
     */
    const doQuitTeam = async (id: number) => {
        const res = await myAxios.post('/team/quit', {
            teamId: id
        });
        if (res?.code === 0) {
            showToast('操作成功');
        } else {
            showToast('操作失败' + (res.description ? `，${res.description}` : ''));
        }
    }

    /**
     * 解散队伍
     * @param id
     */
    const doDeleteTeam = async (id: number) => {
        const res = await myAxios.post('/team/delete', {
            id,
        });
        if (res?.code === 0) {
            showToast('操作成功');
        } else {
            showToast('操作失败' + (res.description ? `，${res.description}` : ''));
        }
    }



</script>

<style scoped>
    #teamCardList :deep(.van-image__img) {
        height: 128px;
        object-fit: unset;
    }
</style>