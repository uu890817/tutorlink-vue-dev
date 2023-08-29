<template >
    <Navbar></Navbar>
    <n-space justify="center">
        <n-space class="addWrap" vertical>
            <n-input maxlength="30" show-count clearable placeholder="請在此輸入試卷名稱" />
            <AddExerciseCard @dataUpdate="card1"></AddExerciseCard>
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
import AddExerciseCard from '@/components/exercises/teachers/teachersComponents/AddExerciseCard.vue'
import { reactive, toRaw } from 'vue';

const cards = reactive([
    {
        id: 1,
        title: "1+1=?",
        type: 1,
        item: ["1", "2", "3", "4"],
    },
    {
        id: 2,
        title: "選出雙數",
        type: 1,
        item: ["5", "10", "15", "20"],
    }

])

const card1 = (data) => {
    // console.log(toRaw(data))
    console.log((JSON.parse(JSON.stringify(data)))[0])

}










</script>
<style scoped>
.addWrap {
    margin-top: 10px;
}
</style>