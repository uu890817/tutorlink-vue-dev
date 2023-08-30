<template >
    <Navbar></Navbar>
    <n-space justify="center">
        <n-space class="addWrap" vertical>
            <n-input maxlength="30" show-count clearable placeholder="請在此輸入試卷名稱" />

            <n-card title="" hoverable justify="center" v-if="exerciseData.length == 0">
                <n-space justify="center">
                    <n-popselect v-model:value="value" :options="options" trigger="click">
                        <n-button type="warning" dashed>{{ value || 'Popselect' }}</n-button>
                    </n-popselect>
                </n-space>
            </n-card>

            <div v-for="item in exerciseData ">
                <div v-if="show">
                    <AddChoiceExerciseCard v-if="item.type == 'choice'" :questionId="item.id" :questionData="item.content"
                        @dataUpdate="getData" @getUp="up" @getDown="down" @newBlock="newBlock" @delBlock="delBlock"
                        :key="item.id">
                    </AddChoiceExerciseCard>
                    <AddFillInExerciseCard v-if="item.type == 'fillIn'" :questionId="item.id" @dataUpdate="getData"
                        @getUp="up" @getDown="down" @newBlock="newBlock" @delBlock="delBlock">
                    </AddFillInExerciseCard>
                </div>
            </div>
            <!-- {{ exerciseData }} -->

            <!-- <AddChoiceExerciseCard questionId="1" @dataUpdate="getData" @getUp="up" @getDown="down" @newBlock="newBlock"
                @delBlock="delBlock">
            </AddChoiceExerciseCard>
            <AddFillInExerciseCard questionId="2" @dataUpdate="card1"></AddFillInExerciseCard> -->
            <!-- <AddExerciseCard></AddExerciseCard> -->


            <!-- <pre>{{ JSON.stringify(exerciseData, null, 2) }}</pre> -->
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
import { ref, toRaw, watch } from 'vue';


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



let childDataSaver = [
    {
        id: 1,
        type: 'choice',
        content: {
            questionTitle: "",
            choice: [{

                isAnswer: false,
                string: ""
            },
            {
                isAnswer: false,
                string: ""
            },
            {
                isAnswer: false,
                string: ""
            },
            {
                isAnswer: false,
                string: ""
            }],
            mutipleChoice: false
        },
    },
    {
        id: 2,
        type: 'fillIn',
        questions: {
            question: "",
            answer: ""
        },

    },

]
const show = ref(true)
const exerciseData = ref(childDataSaver);
const getData = (data, id) => {
    // console.log(toRaw(data))
    // console.log((JSON.parse(JSON.stringify(data))))
    console.log(id)
    console.log(JSON.parse(JSON.stringify(data)))
    console.log(childDataSaver[id - 1])
    childDataSaver[id - 1].content = JSON.parse(JSON.stringify(data))
}

const newChoise = (id) => {
    return {
        id: id,
        type: 'choice',
        content: {
            questionTitle: "",
            choice: [{

                isAnswer: false,
                string: ""
            },
            {
                isAnswer: false,
                string: ""
            },
            {
                isAnswer: false,
                string: ""
            },
            {
                isAnswer: false,
                string: ""
            }],
            mutipleChoice: false
        },
    }
}
const newFillIn = (id) => {
    return {
        id: id,
        type: 'fillIn',
        questions: {
            question: "",
            answer: ""
        },
    }
}

const up = (id) => {
    console.log(JSON.parse(JSON.stringify(exerciseData.value)))
    if (id <= 1) {
        return
    }
    const newData = JSON.parse(JSON.stringify(childDataSaver))
    childDataSaver[id - 1] = newData[id - 2]
    childDataSaver[id - 2] = newData[id - 1]
    childDataSaver[id - 1].id = id
    childDataSaver[id - 2].id = id - 1
    exerciseData.value = childDataSaver
    console.log(JSON.parse(JSON.stringify(exerciseData.value)))
    show.value = false
    show.value = true
}
const down = () => {
    console.info('d')
}
const newBlock = (type) => {
    if (type == 'choice') {
        childDataSaver.push(newChoise(childDataSaver.length + 1))
        exerciseData.value = childDataSaver
    }
    if (type == 'fillIn') {
        childDataSaver.push(newFillIn(childDataSaver.length + 1))
        exerciseData.value = childDataSaver
    }
    show.value = false
    show.value = true

    console.info(childDataSaver)
}
const delBlock = () => {
    console.info('d')
}

watch(value, (data) => {
    if (data === 'choice') {
        exerciseData.value.push({
            type: 'choice',
            id: 1,
            questions: {}
        })
    }
    if (data === 'fillIn') {
        exerciseData.value.push({
            type: 'fillIn',
            id: 1,
            questions: {}
        })
    }
})


</script>
<style scoped>
.addWrap {
    margin-top: 10px;
}
</style>