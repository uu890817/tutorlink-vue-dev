<template>
    <div style="border: 1px solid #b9b9b9; padding: 10px; border-radius: 5px;">

        <span class="asker">⩥ 來自 {{ askerName }} {{ askTime }} :</span>
        <p class="askMsg">{{ askMsg }}</p>
        <hr>
        <n-collapse>
            <n-collapse-item name="1">
                <Answer></Answer>
                <template #header>
                    <n-text class="nHeader">
                        點我查看更多留言
                    </n-text>
                </template>

            </n-collapse-item>


        </n-collapse>

    </div>
</template>
    
<script setup>
import Answer from '@/components/exercises/students/studentsComponents/Answer.vue'
import { ref } from 'vue';



const askerName = ref('王同學')
const askTime = ref('2021-05-21 16:00')
const askMsg = ref('你好，我是王同學，我想要請你幫忙一個事情')


</script>
    
<style scoped>
.asker {
    font-size: 20px;
}

.askMsg {
    font-size: 20px;
    margin-top: 10px;
    padding-left: 25px;
}

.nHeader {
    margin-top: 10px;
    padding: 0 10px;
    font-size: 20px;
    transition: all 0.2s;
}

.nHeader:hover {
    font-size: 20px;
    padding: 0 10px;
    background-color: #d6d6d6;
    border-radius: 5px;
    transition: all 0.2s;
}
</style>