<template>
    <div class="questionWrap">
        <span class="asker">⩥ 來自 {{ askerName }} {{ askTime }} :</span>
        <p class="askMsg">{{ askMsg }}</p>
        <hr>
    </div>
</template>
    
<script setup >
import { ref } from 'vue';



const askerName = ref('林老師')
const askTime = ref('2021-05-21 16:00')
const askMsg = ref('我很忙')
</script>
    
<style scoped>
.questionWrap {
    padding-left: 35px;
}

.asker {
    font-size: 20px;
}

.askMsg {
    font-size: 20px;
    margin-top: 10px;
    padding-left: 25px;
}
</style>