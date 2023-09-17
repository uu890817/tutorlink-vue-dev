<template>
    <n-button quaternary round type="success">
        <n-icon size="15px">
            <MdCheckmarkCircle />
        </n-icon>
        已回應
    </n-button> |
    <n-button quaternary round type="warning">
        <n-icon size="15px">
            <MdCloseCircle />
        </n-icon>
        未回應
    </n-button>

    <!-- <div class="ansWrap"> -->
    <div class="queWrap" v-for="questionData in questionDatas">
        <QA :questionData="questionData" @sendAnswer="sendAnswer"></QA>
    </div>

    <!-- </div> -->
    {{ epId }}
    {{ questionDatas }}
</template>

<script setup>
import QA from '@/components/exercises/teachers/teachersComponents/Question.vue'
import QuestionBox from '@/components/exercises/teachers/teachersComponents/QuestionBox.vue'
import { MdCheckmarkCircle, MdCloseCircle, MdSad } from '@vicons/ionicons4'
import { ref } from 'vue'
import tutorlink from '@/api/tutorlink.js'
import { useRoute } from 'vue-router'

const route = useRoute()

const showQA = ref(false)

const questionDatas = ref([])
const epId = ref(route.params.id);








const getQuestion = async () => {
    let resData = await tutorlink.get(`/teacher/getAllQuestion/${epId.value}`)
    questionDatas.value = resData.data.data
    console.log(resData.data);
    showQA.value = true
}
getQuestion()





</script>

<style scoped>
.queWrap {
    margin: 10px 0;
    padding: 0 80px 0 50px;
}

.ansWrap {
    display: flex;
    width: 90%;
    margin: 10px auto;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;

}
</style>
