<template>
    <n-card :title="titleString" hoverable>
        <n-space vertical>
            <n-input v-model:value="questionData.question" type="textarea" maxlength="50" show-count
                placeholder="請在此輸入題目" />
            <n-input v-model:value="questionData.answer" type="textarea" maxlength="100" show-count
                placeholder="請在此輸入參考解答" />
        </n-space>
        <hr>
        <n-space justify="space-around">
            <n-button strong secondary round type="warning" @click="up">
                上移
            </n-button>
            <n-button strong secondary round type="warning" @click="newBlock">
                新增題目
            </n-button>
            <n-button strong secondary round type="warning" @click="down">
                下移
            </n-button>
        </n-space>

    </n-card>
    <!-- <pre>{{ JSON.stringify(questionData, null, 2) }}</pre> -->
</template>

<script setup lang="js">
import { ref, watch, toRaw, computed, defineEmits } from "vue";

const props = defineProps({
    questionId: String
})
const titleString = props.questionId + "."
const emits = defineEmits(['dataUpdate', 'getUp', 'getDown', 'newBlock'])

const questionData = ref({
    id: parseInt(props.questionId),
    question: "",
    answer: ""
})

const onCreate = () => {
    return {
        isAnswer: false,
        string: ""
    };
}
const up = () => {
    emits('getUp')
}
const down = () => {
    emits('getDown')
}
const newBlock = () => {
    emits('newBlock')
}
watch(questionData, (newVal) => {
    // console.log(newVal)
    emits('dataUpdate', questionData.value)
}, { deep: true })
</script>

<style scoped>
.n-input {
    min-width: 500px;
}
</style>
