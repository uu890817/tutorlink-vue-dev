<template>
    <n-card title="1." hoverable>
        <n-space vertical>
            <n-input type="textarea" maxlength="50" show-count placeholder="請在此輸入題目" />
            <n-dynamic-input v-model:value="choiceValue" :on-create="onCreate" :min="4" :max="6">
                <template #create-button-default>
                    随便搞点啥
                </template>
                <template #default="{ value }">
                    <div style="display: flex; align-items: center; width: 100%">
                        <n-checkbox v-model:checked="value.isAnswer" style="margin-right: 12px" />
                        <n-input v-model:value="value.string" type="text" placeholder="請在此輸入選項，前方勾選即為答案，可單選也可多選"
                            maxlength="50" show-count />
                    </div>
                </template>
            </n-dynamic-input>
        </n-space>
        <hr>
        <n-space justify="space-around">
            <n-button strong secondary round type="success">
                上移
            </n-button>
            <n-button strong secondary round type="success">
                新增題目
            </n-button>
            <n-button strong secondary round type="success">
                下移
            </n-button>
        </n-space>

    </n-card>
    <!-- <pre>{{ JSON.stringify(choiceValue, null, 2) }}
    </pre> -->
</template>

<script setup lang="js">
import { ref, watch, toRaw, computed, defineEmits } from "vue";

const choiceValue = ref([
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
    },
    {
        isAnswer: false,
        string: ""
    }])

const dataToParent = defineEmits(['dataUpdate'])


const data = computed(() => {
    return (choiceValue.value).length
})
const onCreate = () => {
    return {
        isAnswer: false,
        string: ""
    };
}
watch(choiceValue, (newVal) => {
    // console.log(newVal)
    dataToParent('dataUpdate', choiceValue.value)
}, { deep: true })
</script>

<style scoped>
.n-input {
    min-width: 500px;
}
</style>
