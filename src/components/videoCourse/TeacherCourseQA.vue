<template>
  <div style="margin-bottom: 100px; margin-left: 100px" class="question-list">
    <h4 style="margin-bottom: 20px">問與答列表</h4>
    <!-- <select
      v-model="selectedLessonId"
      @change="filterByLesson(selectedLessonId)"
    >
      <option
        v-for="lesson in videoclasses"
        :key="lesson.lessonId"
        :value="lesson.lessonId"
      >
        {{ lesson.lessonName }}
      </option>
    </select> -->
    <div v-for="videoclass in videoclasses" class="video">
      <div class="image-container" v-if="qaList.length > 0">
        <div class="image-wrapper">
          <div class="content" style="margin-bottom: 40px">
            <h5 style="font-weight: bolder">
              課程名稱:{{ videoclass.lessonName }}
            </h5>
            <!-- <h6>所有問答({{ videoclass.qaList.length }})</h6> -->
            <h6>所有問答</h6>
            <ul class="qa-list">
              <li v-for="(qaItem, index) in videoclass.qaList" :key="index">
                <div
                  style="
                    background-color: white;
                    padding: 10px;
                    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
                    margin: 20px 0;
                    width: 900px;
                  "
                >
                  <h5>問題內容</h5>
                  <h6 class="qa-title">{{ qaItem.title }}</h6>
                  <p class="qa-content">{{ qaItem.question }}</p>
                  <p class="qa-time">提問時間:{{ formatDate(qaItem.time) }}</p>
                  <hr />
                  <h6 :class="{ 'text-danger': !qaItem.answer }">
                    {{ qaItem.answer ? qaItem.answer : "尚未回應" }}
                  </h6>
                  <button
                    class="btn btn-dark"
                    type="button"
                    data-bs-toggle="modal"
                    :data-bs-target="'#exampleModal' + qaItem.courseQAId"
                  >
                    回覆
                  </button>
                  <!-- 彈出視窗 -->
                  <div
                    class="modal fade modal-lg"
                    :id="'exampleModal' + qaItem.courseQAId"
                    tabindex="-1"
                    :aria-labelledby="'exampleModalLabel' + qaItem.courseQAId"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div
                          :id="'exampleModalLabel' + qaItem.courseQAId"
                          class="modal-header"
                        >
                          <h5 class="modal-title">回覆問答</h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <!-- 彈出視窗內容 -->
                        <div class="modal-body">
                          <ul class="qa-list">
                            <li :key="index">
                              <h5>問題內容</h5>
                              <h6 class="qa-title">{{ qaItem.title }}</h6>
                              <p class="qa-content">{{ qaItem.question }}</p>
                              <p class="qa-time">
                                提問時間:{{ formatDate(qaItem.time) }}
                              </p>
                              <hr />
                              <h5>您的回應</h5>
                              <input
                                type="text"
                                v-model="qaItem.answer"
                                class="qa-answer-input"
                                style="width: 695px"
                              />
                              <button
                                @click="Answer(qaItem)"
                                class="btn btn-dark"
                                data-dismiss="modal"
                              >
                                發佈
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import tutorlink from "@/api/tutorlink.js";
import { ref, onMounted } from "vue";

const videoclasses = ref([]);
const qaList = ref([]);

const formatDate = (time) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

onMounted(async () => {
  await getcourse();
});

const getcourse = async () => {
  try {
    const response = await tutorlink.get("/VideoLessons");
    console.log("課程列表:", response.data);
    videoclasses.value = response.data;

    if (videoclasses.value.length > 0) {
      // 使用Promise.all等待所有問題列表都獲取完成
      await Promise.all(
        videoclasses.value.map(async (lesson) => {
          const lessonId = lesson.lessonId;
          console.log("lessonId:", lesson.lessonId);
          // 獲取課程問題列表
          const lessonQAList = await getLessonQA(lessonId);
          lesson.qaList = lessonQAList;
        })
      );
    } else {
      console.log("lessonId:", lessonId, "該課程沒有問答");
    }
    console.log("qaList", qaList.value);
  } catch (error) {
    console.error("獲取課程錯誤", error);
  }
};
const getLessonQA = async (lessonId) => {
  try {
    const response = await tutorlink.get(`/courseQA/${lessonId}`);
    console.log("課程QA列表", response.data);

    // 直接賦值给qaList.value
    qaList.value = response.data.map((qaItem) => ({
      ...qaItem,
      tempAnswer: qaItem.answer,
    }));
    if (qaList.value && qaList.value.length > 0) {
      console.log("取得qaId:", qaList.value[0].courseQAId);
    } else {
      console.log("qaList is empty or undefined");
    }

    return response.data;
  } catch (error) {
    console.error("獲取該課問答錯誤", error);
    return [];
  }
};

const Answer = async (qaItem) => {
  try {
    const answer = qaItem.answer;
    const qaId = qaItem.courseQAId;
    const requestBody = {
      answer: answer,
    };
    await tutorlink.put(`/courseQA/${qaId}`, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("回答已更新");
    alert("回答已更新");
    // getcourse();
    // 更新qaList中对应的数据
    // const qaItemIndex = qaList.value.findIndex(
    //   (item) => item.courseQAId === qaId
    // );
    // if (qaItemIndex !== -1) {
    //   qaList.value[qaItemIndex].tempAnswer = updatedQAData.answer;
    // }
  } catch (error) {
    console.error("新增回答時錯誤", error);
  }
};

// const selectedLessonId = ref();
// const filterByLesson = async (selectedLessonId) => {
//   console.log("選擇的Id:", selectedLessonId);
//   await getLessonQA(selectedLessonId);
//   // getcourse(); // 刷新课程数据
// };
</script>
<style scoped>
/* .qa-answer-input-container {
  white-space: pre-wrap;
} */

ul {
  list-style-type: none;
}
input {
  padding: 6px 10px;
  border: 1px solid #ccc;
}
/* button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
button:hover {
  background: #e0e0e0;
} */

.question-list {
  margin-bottom: 100px;
}
/* 
.lesson-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
} */

.qa-list {
  list-style-type: none;
  padding: 0;
}

/* .qa-item {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
} */

.qa-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.qa-content {
  font-size: 14px;
  margin: 5px 0;
}

.qa-time {
  font-size: 12px;
  color: #777;
  margin: 0;
}

/* .qa-answer {
  display: flex;
  align-items: center;
}

.qa-answer p {
  margin: 0;
} */

.qa-answer-input {
  flex-grow: 1;
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* .qa-answer-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.qa-answer-button:hover {
  background-color: #0056b3;
} */
</style>
