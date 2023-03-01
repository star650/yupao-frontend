<template>
    <div id="teamAddPage">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                        v-model="addTeamData.name"
                        name="name"
                        label="队伍名"
                        placeholder="请输入队伍名"
                        :rules="[{ required: true, message: '请输入队伍名' }]"
                />
                <van-field
                        v-model="addTeamData.description"
                        rows="4"
                        autosize
                        label="队伍描述"
                        type="textarea"
                        placeholder="请输入队伍描述"
                />

                <!--                文本框里套一个时间选择器-->
                <van-field
                        is-link
                        readonly
                        name="datePicker"
                        label="过期时间"
                        :placeholder="addTeamData.expireTime ?? '点击选择过期时间'"
                        @click="showPicker = true"
                />

                <!--               @confirm表示时间选择器点击确认之后该怎么样 -->
                <van-popup v-model:show="showPicker" position="bottom">

                    <van-date-picker
                            @confirm="onConfirm"
                            @cancel="showPicker = false"
                            type="datetime"
                            title="请选择过期时间"
                            :min-date="minDate"
                    />

                </van-popup>

                <van-field name="radio" label="队伍状态">
                    <template #input>
                        <van-radio-group v-model="addTeamData.status" direction="horizontal">
                            <van-radio name="0">公开</van-radio>
                            <van-radio name="1">私有</van-radio>
                            <van-radio name="2">加密</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field
                        v-if="Number(addTeamData.status) === 2"
                        v-model="addTeamData.password"
                        type="password"
                        name="password"
                        label="密码"
                        placeholder="请输入队伍密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup lang="ts">

    import {useRoute, useRouter} from "vue-router";
    import myAxios from "../plugin/myAxios";
    import {Toast} from "vant";
    import {onMounted, ref} from "vue";
    import {TeamType} from "../models/team";
    //进行路由的跳转
    const router = useRouter();
    //获取访问当前页面的路由携带的参数
    const route = useRoute();
    // 展示日期选择器
    const showPicker = ref(false);
    //这个时间为进入页面的时间
    const minDate = new Date();


    // 需要用户填写的表单数据
    const addTeamData = ref({})

    //获取传来的队伍id
    const id = route.query.id;

    const onConfirm = ({selectedValues}) => {
        addTeamData.value.expireTime = selectedValues.join('-');
        showPicker.value = false;
    }

    //获取之前队伍的信息
    onMounted(async () => {
        if (id <= 0 || id == null) {
            Toast.fail("队伍加载失败");
            return;
        }
        const res = await myAxios.get("/team/get", {
            params: {
                id: id,
            }
        });
        if (res?.code === 0) {
            //赋给addTeamData，回填到当前表单中
            addTeamData.value = res.data;
        } else {
            Toast.fail("队伍加载失败，请刷新重试");
        }
    })

    // 提交
    const onSubmit = async () => {
        const postData = {
            ...addTeamData.value,
            status: Number(addTeamData.value.status)
        }
        // todo 前端参数校验
        const res = await myAxios.post("/team/update", postData);
        if (res?.code === 0 && res.data) {
            Toast.success('更新成功');
            router.push({
                path: '/team',
                replace: true,
            });
        } else {
            Toast.success('更新失败');
        }
    }
</script>

<style scoped>
    #teamPage {
    }
</style>