<template>
  <Navbar></Navbar>
  <div class="black-back">
    <div class="infoLeft">
      <h4 class="courseTitle">{{ lessonList.lessonName }}</h4>
      <div>
        <p>評分</p>
      </div>
      <p>建立者:{{ teacherList.userName }}</p>
      <p>最近更新日期:{{ formatDate(lessonList.lessondetail.createTime) }}</p>
      <p>使用語言:{{ lessonList.lessondetail.language }}</p>
    </div>
    <div class="spacer2"></div>
    <div class="infoRight">
      <div>
        <video
          ref="videoPlayer"
          class="video-js vjs-default-skin"
          muted
          preload="auto"
        >
          <!-- <source :src="currentVideo.src" type="video/mp4" /> -->
        </video>
      </div>
    </div>
  </div>
  <div class="container-content">
    <div class="contentLeft">
      <div class="willLearn box">
        <h3>您會學到</h3>
        <ul>
          <li v-for="willLearn in lessonList.studentWillLearn">
            {{ willLearn.willLearnContent }}
          </li>
        </ul>
      </div>
      <div class="courseList box">
        <h3>課程章節預覽</h3>
        <div class="playlist">
          <ul>
            <li v-for="(video, index) in videoList" :key="index">
              {{ video.chapterName }}
            </li>
          </ul>
        </div>
      </div>
      <div class="directions box">
        <h3>說明</h3>
        <!-- <p>{{ lessonList.lessondetail.imformation }}</p> -->
        <div v-html="source"></div>
      </div>
      <!-- <div class="teacher box">
        <h3>講師</h3>
        <p>講師姓名:{{ teacherList[0].teacherName }}</p>
        <p>講師介紹:{{ teacherList[0].teacherInfo }}</p>
      </div> -->
      <div class="score box">
        <h3>{{}}課程評等 {{}}則評等</h3>
      </div>
    </div>
    <div class="spacer"></div>
    <div class="contentRight">
      <div class="pricebox">
        <h4>${{ lessonList.price }}</h4>
        <div class="price-container">
          <div class="price-top">
            <button type="button" class="btn btn-dark">加入購物車</button>
            <button type="button" class="btn btn-outline-danger">收藏</button>
          </div>
          <div class="price-down">
            <button type="button" class="btn btn-outline-dark">立即購買</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import videojs from "video.js/dist/video.min";
import "video.js/dist/video-js.min.css";
import { ref, onMounted } from "vue";
import Navbar from "../components/public/Navbar.vue";
import { useRoute, useRouter } from "vue-router";
import tutorlink from "@/api/tutorlink.js";

const route = useRoute();
const lessonDetailIdData = ref(route.params.lessonId);
// const lessonDetailIdData = ref(7);

onMounted(async () => {
  initVideoSource();
  await getVideo();
  getCourse();
});

const videoPlayer = ref(null);
let player;
function initVideoSource() {
  const options = {
    bigPlayButton: true,
    textTrackDisplay: false,
    posterImage: true,
    errorDisplay: false,
    height: 180,
    width: 350,
    playbackRates: [0.75, 1, 1.25, 1.5, 2],
    controls: true,
    autoplay: false,
  };

  player = videojs(videoPlayer.value, options);
}

const lessonList = ref([]);
const lessonDetailList = ref([]);
const videoList = ref([]);
const teacherList = ref([]);
const lessondetail = ref([]);
let lessonContent = ref("");
const source = lessonContent;

//取得課程
const getCourse = async () => {
  try {
    const response = await tutorlink.get(
      `/findLessonByLessonId/${lessonDetailIdData.value}`
      // `/findLessonByLessonId/1`
    );
    console.log("此門課程:", response.data);
    lessonList.value = response.data;
  } catch (error) {
    console.error("獲取課程錯誤", error);
  }
};
getCourse();

tutorlink
  .get(`/findLessonDetailByLessonId?lessonId=${lessonDetailIdData.value}`)
  .then((response) => {
    lessondetail.value = response.data;
    lessonContent.value = lessondetail.value.imformation;
    console.log("CK:", lessonContent.value);
  });

//取得老師姓名
const getTeacher = async () => {
  try {
    const response = await tutorlink.get(
      `/teacherInfo/${lessonDetailIdData.value}`
    );
    teacherList.value = response.data;
    console.log(teacherList.value);
  } catch (error) {
    console.error("獲取老師錯誤", error);
  }
};
getTeacher();

// 取得課程影片資訊
const getCourseVideosInfo = async () => {
  try {
    const response = await tutorlink.get(
      `/findVideoByCourse/${lessonDetailIdData.value}`
      // `/findVideoByCourse/1`
    );
    console.log("影片列表:", response.data);

    videoList.value = response.data;
  } catch (error) {
    console.error("獲取影片時出錯", error);
  }
};
getCourseVideosInfo();

//取得課程預覽影片
const getVideo = async () => {
  try {
    const response = await tutorlink.get(
      `/preVideo/${lessonDetailIdData.value}`,
      // `/preVideo/1`,
      {
        responseType: "blob",
      }
    );

    // 处理获取到的视频文件，可能需要使用Blob URL或其他方式来播放或显示视频
    const videoBlob = response.data;

    // 示例：将视频Blob URL设置为HTML5视频元素的src
    const videoUrl = URL.createObjectURL(videoBlob);

    console.log(videoUrl);
    player.src({ src: videoUrl, type: "video/mp4" });
  } catch (error) {
    console.error("獲取影片出錯", error);
  }
};

const formatDate = (time) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
</script>

<style scoped>
ul {
  list-style: none;
}
.black-back {
  background-color: #011627;
  width: 100vw;
  height: 300px;
  display: flex;
  /* flex-direction: column; */
  /* justify-content: flex-start; */
  /* align-items: center; */
  padding: 50px 50px;
  color: white;
  margin: 0;
  margin-bottom: 30px;
  justify-content: center;
}
.spacer2 {
  width: 400px;
}
.container-content {
  width: 100vw;
  display: flex;
  /* justify-content: space-around; */
  padding: 0 150px;
  justify-content: center;
}

.box {
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 20px;
  width: 100%;
}
.contentLeft {
  margin-bottom: 50px;
  /* margin-left: 50px; */
  margin-right: 50px;
  width: 550px;
}
/* .spacer {
  min-width: 20px; 
  margin: 0;
} */

.contentRight {
  margin-bottom: 50px;
  margin-left: 30px;
  margin-right: 30px;
}

.pricebox {
  border: 1px solid #ccc;
  padding: 10px 50px;
  position: sticky;
  top: 80px;
  background-color: white; /* 添加背景颜色，以便在覆盖内容时不会显示透明 */
  z-index: 1; /* 确保元素在其他内容上方 */
  width: 290px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2); /* 添加阴影 */
}

.price-container {
  display: flex;
  flex-direction: column;
}

.price-top {
  display: flex;
  gap: 20px;
  width: 100%;
  margin-bottom: 10px;
  justify-content: center;
}

.price-down {
  display: flex;
  justify-content: center;
  width: 100%;
}
.price-down button {
  width: 100%;
}

.btn {
  border-radius: 0;
}

.playlist ul {
  list-style: none;
  margin-bottom: 0;
}
</style>
