import { ref } from 'vue'
import { defineStore } from 'pinia'
import tutorlink from '../api/tutorlink.js'



export const useChatRoomStore = defineStore('chatRoomStore', () => {

    const userId = ref(0)

    async function getUserId() {
        if (userId) {
            try {
                const resData = await tutorlink.get(`/ws/userId`)
                console.log(resData)
                userId.value = resData.data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }



    return { userId, getUserId }
})