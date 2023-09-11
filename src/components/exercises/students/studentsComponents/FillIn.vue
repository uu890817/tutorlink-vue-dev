<template>
    <div class="choiceWrap">
        <snap class="title">{{ "(" + props.index + ") " }}</snap>
        <snap class="title">{{ data.content }}</snap>

        <div class="checkboxWrap">
            <!-- 填充題 -->
            <textarea name="" id="" cols="30" rows="5" :value="answer"></textarea>
        </div>

    </div>
</template>
    
<script setup>
const props = defineProps({
    data: Object,
    index: Number

})
</script>
    
<style scoped>
.choiceWrap {
    min-width: 100px;
    padding: 20px 50px;
    /* border: 1px solid #555; */
    border-radius: 10px;
}

textarea {
    font-size: 20px;
}


.title {
    font-size: 20px;
    /* color: rgb(218, 7, 7); */
}
</style>