<template >
    <div class="chatNavBar">聊天室</div>
    <div class="wrap">


        <div class="left">
            <div class="leftInner">
                <n-scrollbar style="max-height: 470px">
                    <div v-for="item in 20">
                        <div class="userItem">
                            <img src="https://picsum.photos/200/200" style="width: 50px; border-radius: 100%;">
                            <span style="margin: 0px 0 0 10px;vertical-align: middle; font-size: 20px;">謝老師{{ item }}</span>
                        </div>
                    </div>
                </n-scrollbar>
            </div>
        </div>

        <div class="right">
            <div class="rightInner">
                <n-scrollbar style="max-height: 350px">

                    <n-space>
                        <div class="otherChat">
                            <img src="https://picsum.photos/200/200" style="width: 40px; border-radius: 100%;">
                            <div class="otherChatText">HIHI</div>
                        </div>
                    </n-space>

                    <n-space justify="end">
                        <div class="myChat">
                            <div class="myChatText">HIHI</div>
                        </div>
                    </n-space>


                    <n-space>
                        <div class="otherChat">
                            <img src="https://picsum.photos/200/200" style="width: 40px; border-radius: 100%;">
                            <div class="otherChatText">{{ userId }}</div>
                        </div>
                    </n-space>

                    <n-space justify="end">
                        <div class="myChat">
                            <div class="myChatText"> {{ wsData.data }}</div>
                        </div>
                    </n-space>



                </n-scrollbar>
                <div class="inputBox">
                    <n-input v-model:value="inputValue" type="textarea" autosize placeholder="請輸入..."
                        @:keyup.enter="onEnter" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onBeforeUnmount, ref } from 'vue'
import tutorlink from '@/api/tutorlink.js'
import { useChatRoomStore } from '@/stores/useChatRoomStore'
import { storeToRefs } from 'pinia'

const userIdStore = useChatRoomStore()
const { getUserId } = userIdStore
const { userId } = storeToRefs(userIdStore)



const waitId = () => {
    if (userId.value === "0") {
        console.info("waiting..." + userId.value)
        getUserId()
        setTimeout(waitId(), 1000)
    }
    console.info("waiting..." + userId.value)
}
waitId()



let mySocket = null
const wsData = ref("")
const key = ref("")
const enter = (e) => {
    key.value = e.key
    console.log(e)
}

const inputValue = ref('')
const onEnter = (e) => {
    if (e.key !== "Enter") {
        return
    }

    if (e.shiftKey === true) {
        // inputValue.value = inputValue.value + "\n"
        console.log(1)
        return
    }
    if (e.shiftKey === false) {
        mySocket.send(`9<message>${inputValue.value}`)
        inputValue.value = ""
        console.log(2)

        return
    }
}


const getChatRoom = async () => {
    let resData = await tutorlink.get('/ws/myRooms')
    console.log(resData.data)
}
getChatRoom()

if ('WebSocket' in window) {
    let ms = new WebSocket(`ws://localhost:8081/tutorlink/tSocket/${userId.value}`)

    ms.onopen = () => {
        wsData.value = "WS連結成功"
        console.log("WS連結成功");


    }
    ms.onmessage = (e) => {
        wsData.value = e
        console.log(e);
    }

    ms.onclose = () => {
        wsData.value = "WS關閉"
        console.log("WS關閉");
    }

    ms.onerror = (error) => {
        console.log("錯誤: ")
        console.log(error);
    }
    mySocket = ms
}

mySocket.onopen = () => {
    mySocket.send("Hello Server!")
}

// 
</script>
<style scoped>
/* * {
    height: 100%;
} */

.chatNavBar {
    width: 100%;
    height: 30px;
    border-radius: 5px 5px 0 0;
    background: #b1d9cf;
    padding: 5px 0 0 10px;
}

.wrap {
    position: relative;

}



.left {
    position: absolute;
    left: 0;
    top: 0;
    width: 30%;
    height: 100%;

}

.leftInner {
    padding: 10px;
    height: 470px;
    background-color: #fafcff;
    border-radius: 0 0 0 5px;
}

.right {
    position: absolute;
    right: 0;
    top: 0;
    width: 70%;
    height: 100%;
    background: #fff;
}

.rightInner {
    padding: 10px;
    height: 470px;
    background-color: rgb(255, 246, 246);
    border-radius: 0 0 5px 0;

}

.inputBox {
    display: inline-block;
    position: fixed;
    bottom: 10px;

}

.n-input {
    width: 470px;
    height: 88px;
}

.userItem {
    padding: 5px;
    width: 100%;
    height: 60px;
    transition: all 0.3s;

}

.userItem:hover {
    background-color: #dcdcdc;
    padding: 5px;
    width: 100%;
    height: 60px;
    transition: all 0.3s;
}

.otherChat {
    display: block;
    height: 50px;
}

.otherChatText {
    display: inline;
    vertical-align: middle;
    margin: 5px 0 0 10px;
    padding: 5px 10px 5px 10px;
    background-color: #e0f4ff;
    border-radius: 0 50px 50px 50px;
}

.myChat {
    display: block;
    height: 50px;
    right: 0;
}

.myChatText {
    vertical-align: middle;
    display: inline;
    margin: 5px 10px 0 0;
    padding: 5px 10px 5px 10px;
    background-color: #ffe0f1;
    border-radius: 50px 0 50px 50px;
}
</style>