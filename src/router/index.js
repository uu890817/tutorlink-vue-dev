import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/MainView.vue"),
      meta: {
        needLogin: false // 不需要登入
      },
      children: [{
        path: "/",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
      //還沒寫此頁面
      // {
      //   path: "/search",
      //   name: "search",
      //   component: () => import("@/views/Search.vue"),
      // },
      {
        path: "/videoCourse/:id?",
        name: "VideoCourse",
        component: () => import("@/views/VideoCourse.vue"),
      },
      {
        path: "/rate",
        name: "rate",
        component: () => import("@/views/Rate.vue"),
      },
      ]
    },
    // -------------------登入後---------------------------------
    {
      path: "/member",
      name: "member",
      component: () => import("@/views/MainView.vue"),
      redirect: { name: 'student' },
      meta: {
        needLogin: true // 需要登入
      },
      children: [
        {
          path: "student",
          name: "student",
          redirect: { name: 'studentlesson' },
          component: () => import("@/views/UserStudent.vue"),
          children: [
            {
              path: "beteacher",
              name: "beteacher",
              component: () => import("@/components/personal/BeTeacher.vue"),
            },
            {
              path: "studentlesson",
              name: "studentlesson",
              component: () => import("@/components/lessons/AllStudentLessonView.vue"),
            },
            {
              path: "exercise",
              component: () =>
                import("@/components/exercises/students/StudentAllExercises.vue"),
            },
            {
              path: "videocourse",
              component: () =>
                import("@/components/videoCourse/StudentAllVideoCourse.vue"),
            },
            {
              path: "favoriate",
              component: () =>
                import("@/components/favoriate/FavoriateComponent.vue"),
            },
          ]
        },
        //路徑在/member下但是只有獲得權限的特定學生可以使用的頁面
        {
          path: "exerciseScore/:id?",
          component: () =>
            import("@/components/exercises/students/StudentScore.vue"),
        },
        {
          path: "doExercise/:id?",
          component: () =>
            import("@/components/exercises/students/StudentDoExercise.vue"),
        },
        {
          path: "exercise/:id?",
          component: () =>
            import("@/components/exercises/students/StudentScore.vue"),
        },
        //學生影片，有買才看的到
        {
          path: "videoClassPage",
          name: "VideoClassPage",
          component: () => import("@/views/VideoClassPage.vue"),
        },
        //----------------------------老師-----------------------------
        {
          path: "teacher",
          redirect: { name: 'mylesson' },
          component: () => import("@/views/UserTeacher.vue"),
          children: [
            {
              path: "mylesson",
              name: "mylesson",
              component: () =>
                import("@/views/LessonPage.vue"),
            },
            {
              path: "exercise",
              component: () =>
                import("@/components/exercises/teachers/TeacherAllExercises.vue"),
            },
            {
              path: "correct/:id?",
              component: () =>
                import(
                  "@/components/exercises/teachers/CorrectStudentsExercises.vue"
                ),
            },
            {
              path: "qa/:id?",
              component: () =>
                import("@/components/exercises/teachers/QuestionNAnswer.vue"),
            },
            //老師管理課程
            {
              path: "createVideoCourse",
              name: "CreateVideoCourse",
              component: () => import("@/views/CreateVideoCourse.vue"),
            },
          ],
        },
        //路徑在 /member 下但是只有老師可以使用的頁面
        {
          path: "addExercise/:id?",
          component: () =>
            import("@/components/exercises/teachers/AddExercise.vue"),
        },
        {
          path: "updateExercise/:id?",
          component: () =>
            import("@/components/exercises/teachers/UpdateExercise.vue"),
        },
        {
          path: "lesson/lessonInterFace",
          name: "lessonInfo",
          component: () => import("@/views/LessonInterFace.vue"),
        },
        {
          path: "lesson/checkEdit",
          name: "checkEdit",
          component: () => import("@/views/CheckEditLesson.vue"),
        },
        {
          path: "lesson/Edit",
          name: "Edit",
          component: () => import("@/views/EditLesson.vue"),
        },
        {
          path: "lesson/insert",
          name: "insertLesson",
          component: () => import("@/views/InsertLessonPage.vue"),
        },
        //-----------------member共用----------------
        {
          path: "personal",
          name: "personal",
          component: () => import("@/views/Personal.vue"),
          children: [
            {
              path: "info",
              component: () => import("@/components/personal/Infomation.vue"),
            },
            {
              path: "apply",
              component: () => import("@/components/personal/ApplyTeacher.vue"),
            },
          ],
        },
        {
          path: "calendar",
          name: "calendar",
          component: () => import("@/views/Calendar.vue"),
        },
        {
          path: "purchase",
          name: "purchase",
          component: () => import("@/views/Purchase.vue"),
        },
        {
          path: "shoppingcart",
          name: "shoppingcart",
          component: () => import("@/views/MainView.vue"),
          redirect: { name: 'step1' },
          children: [
            {
              path: "step1",
              name: "step1",
              component: () => import("@/components/shopping/CartStep1.vue"),
            },
            {
              path: "step2",
              name: "step2",
              component: () => import("@/components/shopping/CartStep2.vue"),
            },
            {
              path: "step3",
              name: "step3",
              component: () => import("@/components/shopping/CartStep3.vue"),
            },]
        },
        {
          path: "myfavoriate",
          name: "myfavoriate",
          component: () => import("@/views/Favoriate.vue"),
        },
      ],
    },
    // -------------------錯誤---------------------------------
    {
      path: "/error",
      name: "error",
      redirect: { name: '404' },
      component: () => import("@/views/errorView/error.vue"),
      children: [
        {
          path: "403",
          name: "403",
          component: () => import("@/views/errorView/403.vue"),
        },
        {
          path: "404",
          name: "404",
          component: () => import("@/views/errorView/404.vue"),
        },
        {
          path: "500",
          name: "500",
          component: () => import("@/views/errorView/500.vue"),
        },

      ]
    },


    // -------------------攔截---------------------------------
    {
      path: '/:notFound(.*)',
      redirect: { name: 'error' }
    }
  ],
});


router.beforeEach((to) => {
  if (to.meta.needLogin) {

    console.info("來自路由守衛: 本頁面需登入")
    //登入辨別位置
    return
  }
  console.info("來自路由守衛: 本頁面不需登入")

})




export default router;
