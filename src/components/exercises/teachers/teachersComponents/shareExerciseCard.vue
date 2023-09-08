<template>
    <n-card title="" hoverable>
        <n-space justify="space-between" size="large" align="center">
            <img class="stuImg" src="https://fakeimg.pl/300/" alt="" srcset="">
            <h1>{{ props.stdData.userName ? props.stdData.userName : "無使用者名稱" }}</h1>
            <n-space vertical>
                <n-button type="primary" @click="showShareModal = true">{{ props.stdData.exerPermissions ? "已分享" : "分　享"
                }}</n-button>

                <n-button type="primary" v-if="props.stdData.exerPermissions !== null"
                    @click="showModal = true">修　改</n-button>
            </n-space>
        </n-space>
    </n-card>



    <n-modal v-model:show="showShareModal" style="width: 600px;" :mask-closable="false" :bordered="false"
        :segmented="segmented" class="custom-card" preset="card" :style="bodyStyle" size="huge" title="分享試卷設定檔 - 針對每個學生設定">
        <n-card title="">
            <n-space vertical>
                習題類型:<n-select v-model:value="exerciseType" :options="exerciseTypeOptions" placeholder="請選擇習題類型" />
            </n-space>
            <n-space vertical>
                習題有效時間:
                <n-date-picker v-model:value="dateTime" update-value-on-close type="datetimerange"
                    start-placeholder="開始日期及時間" end-placeholder="結束日期及時間" :actions="['clear']" />
            </n-space>
            <n-space vertical>
                倒數計時:
                <n-space>
                    <n-switch v-model:value="timePickerDisable" :checked-value="false" :unchecked-value="true" />
                    <n-time-picker v-model:value="timePicker" size="small" :disabled="timePickerDisable" :actions="null" />
                    {{ realTimePicker }} 秒
                </n-space>

            </n-space>
            <n-space vertical>
                完成顯示答案:
                <n-space>
                    否
                    <n-switch v-model:value="showAnswer" :checked-value="false" :unchecked-value="true" />
                    是
                </n-space>

            </n-space>
        </n-card>


        <n-space justify="center">
            <n-button strong secondary type="success" @click="save">
                儲存試卷
            </n-button>
        </n-space>
    </n-modal>
</template>

<script setup lang="js">
import { MdDoneAll } from '@vicons/ionicons4'

import { ref, computed } from 'vue'

import { NCard } from 'naive-ui';


const lessonOptions = ref([{
    label: "不綁定課程",
    value: "-1",
},])
const exerciseTypeOptions = [
    {
        label: "作業",
        value: "1",
    },
    {
        label: "考試",
        value: "2"
    },
    {
        label: "影片課程練習題",
        value: "3"
    }
]
const timePickerDisable = ref(true)
const showAnswer = ref(true)
const timePicker = ref(-28800000)
const realTimePicker = computed(() => {
    return (timePicker.value + 28800000) / 1000
})







const showShareModal = ref(false)
const props = defineProps({
    stdData: Object,
})

const onNegativeClick = () => {
    showShareModal.value = false
}


const onPositiveClick = () => {
    showShareModal.value = false
    notify('success')



}




</script>

<style scoped>
.n-card {
    margin-bottom: 10px;
}

.n-button {
    padding: 10px 50px;
    margin-right: 10px;
    font-size: large;

}

.stuImg {
    width: 100px;
    height: 100px;
    border-radius: 100%;
}

p {
    color: yellowgreen;
}

.NProgress {
    margin-right: 80px;
}

.n-progress {
    max-width: 100px;
}
</style>