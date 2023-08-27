<template>
    <n-card title="試卷1" hoverable>

        <n-space justify="space-around">
            <n-space class="NProgress" vertical>
                <n-tag type="error" round>
                    林老師的數學教室
                </n-tag>
                <n-tag type="error" round>
                    作業
                </n-tag>
            </n-space>
            <n-space class="NProgress" vertical>
                <n-progress type="dashboard" gap-position="bottom" :percentage="70" unit="分" color="#66CCFF" />
                平均分數
            </n-space>
            <n-space class="NProgress" vertical>
                <n-progress type="dashboard" gap-position="bottom" :percentage="70" unit="%" color="#B7cc22" />
                填寫人數百分比
            </n-space>

        </n-space>



        <hr>
        <n-space justify="space-around">
            <n-button strong secondary type="primary">
                <n-icon>
                    <MdHelpCircle />
                </n-icon>
                Q&A
            </n-button>
            <n-button strong secondary type="primary">
                <n-icon>
                    <MdCheckmarkCircleOutline />
                </n-icon>
                批改試卷
            </n-button>
            <n-button strong secondary type="info">
                <n-icon>
                    <MdPersonAdd />
                </n-icon>
                分享試卷
            </n-button>
            <n-button strong secondary type="info">
                <n-icon>
                    <MdSettings />
                </n-icon>
                更新習題
            </n-button>
            <n-button strong secondary type="info">
                <n-icon>
                    <MdClipboard />
                </n-icon>
                拷貝試卷
            </n-button>
            <n-button strong secondary type="error">
                <n-icon>
                    <MdTrash />
                </n-icon>
                刪除試卷
            </n-button>
        </n-space>
    </n-card>
</template>

<script setup lang="js">
import { MdHelpCircle, MdPersonAdd, MdClipboard, MdCheckmarkCircleOutline, MdSettings, MdTrash } from '@vicons/ionicons4'
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