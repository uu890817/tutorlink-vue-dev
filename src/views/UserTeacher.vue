<template>
  <div v-if="teacher">
    <navbar></navbar>
    <div class="wrap">
      <div style="display: flex;justify-content: space-between">
        <h1>我的課程</h1>
        <input type="button" value="學生" class="btn btn-light" @click="student">
      </div>
      <div class="quickLink">
        <router-link class="routerLink" to="/member/teacher/mylesson">
          課程管理</router-link>
        <router-link class="routerLink" to="/member/teacher/exercise">
          試卷管理</router-link>
        <div class="routerLink">
          <teacherCalendarBtn></teacherCalendarBtn>
        </div>
        <router-link class="routerLink" to="/member/teacher/TeacherMagVideoCourse/teacherAllVideoCourse">
          影音管理</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="js">
import Navbar from "@/components/public/Navbar.vue"
import teacherCalendarBtn from "../components/calendar/teacherCalendarButton.vue"
import tutorlink from '@/api/tutorlink.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()
const teacher = ref(false)

const type = () => {
  const API_URL = `/type`
  tutorlink.post(API_URL)
    .then((response) => {
      if (response.data === 1 || response.data === 3) {
        alert("你不是老師喔~")
        router.push('/member/student')
      } else if (response.data === 2) {
        teacher.value = true
      }
    }
    )
}
type()

const student = () => {
  router.push('/member/student')
}
</script>

<style scoped>
h1 {
  color: white;
  font-weight: bolder;
  padding-top: 25px;
  padding-left: 10px;
}

.wrap {
  display: block;
  position: relative;
  width: 100%;
  height: 150px;
  /* margin: 0% auto; */
  background-color: rgb(45, 43, 43);
  padding-left: 25%;
  padding-right: 25%;
}



.quickLink {
  position: absolute;
  bottom: 2px;
  font-size: 25px;
  display: flex;
}

.routerLink {
  display: flex;
  margin: 10px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 5px solid rgb(45, 43, 43);
}

.routerLink:hover {
  margin: 10px;
  /* color: rgb(165, 174, 189); */
  font-weight: bold;
  /* transition: all; */
  /* transition-duration: 0.5s; */
  border-bottom: 5px solid rgb(75, 180, 148);
}

.routerLink:focus {
  border-bottom: 5px solid rgb(230, 235, 234);
}

body::-webkit-scrollbar {
  display: none;
}

.btn {
  height: 30px;
  margin-top: 10px;
  margin-right: 90px;
  line-height: 17px;
}
</style>
