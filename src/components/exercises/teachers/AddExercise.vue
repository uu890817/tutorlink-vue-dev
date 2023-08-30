<template >
    <Navbar></Navbar>
    <n-space justify="center">
        <n-space class="addWrap" vertical>
            <n-input maxlength="30" show-count clearable placeholder="請在此輸入試卷名稱" />

            <n-card title="" hoverable justify="center">
                <n-space justify="center">
                    <n-popselect v-model:value="value" :options="options" trigger="click">
                        <n-button type="warning" dashed>{{ value || 'Popselect' }}</n-button>
                    </n-popselect>
                </n-space>
            </n-card>

            <AddChoiceExerciseCard questionId="1" @dataUpdate="getData" @getUp="up" @getDown="down" @newBlock="newBlock">
            </AddChoiceExerciseCard>
            <AddFillInExerciseCard questionId="2" @dataUpdate="card1"></AddFillInExerciseCard>
            <!-- <AddExerciseCard></AddExerciseCard> -->



            <n-space justify="center">
                <n-button strong secondary type="success">
                    儲存試卷
                </n-button>
            </n-space>
        </n-space>

    </n-space>
    <br>
</template>
<script setup lang="js">
import Navbar from '@/components/public/Navbar.vue'
import AddChoiceExerciseCard from '@/components/exercises/teachers/teachersComponents/AddChoiceExerciseCard.vue'
import AddFillInExerciseCard from '@/components/exercises/teachers/teachersComponents/AddFillInExerciseCard.vue'
import { ref, toRaw } from 'vue';

const exerciseData = ref([

]);
const value = ref("Drive My Car")
const options = [
    {
        label: "選擇題",
        value: "choice"
    },
    {
        label: "填充題",
        value: "fillIn"
    },]
const getData = (data) => {
    // console.log(toRaw(data))
    console.log((JSON.parse(JSON.stringify(data))))

}



const up = () => {
    console.info('u')
}
const down = () => {
    console.info('d')
}
const newBlock = () => {
    console.info('b')
}




</script>
<style scoped>
.addWrap {
    margin-top: 10px;
}
</style>