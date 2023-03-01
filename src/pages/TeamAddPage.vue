<template>
<!--    创建队伍页面-->
    <div id="teamAddPage">
<!--        表单页面，Form表单组件-->
        <van-form @submit="onSubmit">
            <van-cell-group inset>
<!--    v-model表示双向绑定，用于传递队伍名称，     name属性意义不大-->
                <van-field
                        v-model="addTeamData.name"
                        name="name"
                        label="队伍名"
                        placeholder="请输入队伍名"
                        :rules="[{ required: true, message: '请输入队伍名' }]"
                />
<!--            rows表示默认几行， autosize表示自动扩展行数，-->
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


                <!--表单里面套一个步进器  -->
                <van-field name="stepper" label="最大人数">
                    <template #input>
                        <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
                    </template>
                </van-field>
                <!--表单里面套了一个单选框，name随便指定，无所谓，这里起作用的是v-model-->
                <van-field name="radio" label="队伍状态">
                    <template #input>
                        <van-radio-group v-model="addTeamData.status" direction="horizontal">
                            <van-radio name="0">公开</van-radio>
                            <van-radio name="1">私有</van-radio>
                            <van-radio name="2">加密</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <!--如果队伍状态为加密，才显示密码-->
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

    import {useRouter} from "vue-router";
    import { ref } from 'vue';
    import myAxios from "../plugin/myAxios";


    const router = useRouter();
    // 展示日期选择器
    const showPicker = ref(false);
    //这个时间为进入页面的时间
    const minDate = new Date();

    const onConfirm = ({selectedValues}) => {
        addTeamData.value.expireTime = selectedValues.join('-');
        showPicker.value = false;
    }

    //定义一个初始的表单数据，这些字段可从knife4j测试文档 创建队伍接口获取
    const initFormData = {
        "name": "",
        "description": "",
        "expireTime": null,
        "maxNum": 3,
        "password": "",
        "status": 0,
    }


 // 声明一个要用户填写的表单对象，直接把对象传递给后端接口，需要用户填写的表单数据
    // ...表示复制initFormData，从而保证初始的表单数据不会被修改
    const addTeamData = ref({...initFormData})

    // 提交
    const onSubmit = async () => {
        //第二行status参数带不带都行，带了就替换第一行参数列表中的status值
        const postData = {
            ...addTeamData.value,
            status: Number(addTeamData.value.status)
        }
        // todo 前端参数校验
        const res = await myAxios.post("/team/add", postData);
        if (res?.code === 0 && res.data){
            // Toast.success('添加成功');
            //replace：true表示即使回退，也无法回退到当前页面，而是回退到当前页面的上一个页面
            router.push({
                path: '/team',
                replace: true,
            });
        } else {
            // Toast.success('添加失败');
        }
    }
</script>

<style scoped>
    #teamPage {

    }
</style>
