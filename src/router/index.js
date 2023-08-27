import { createRouter, createWebHistory } from 'vue-router'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/myfavoriate',
      name: 'myfavoriate',
      component: () => import('../views/Favoriate.vue')
    },
    {
      path: '/shoppingcart',
      name: 'shoppingcart',
      component: () => import('../views/Shoppingcart.vue')
    },
    {
      path: '/score',
      name: 'score',
      component: () => import('../views/Score.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/Calendar.vue')
    },
    {
      path: '/student',
      name: 'student',
      component: () => import('../views/UserStudent.vue'),
      children: [
        {
          path: '/beteacher',
          name: 'beteacher',
          component: () => import('../components/BeTeacher.vue')
        },
        {
          path: '/mylesson',
          name: 'mylesson',
          component: () => import('../components/seeMyLesson.vue')
        },
        {
          path: 'exercise',
          component: () => import('../components/exercises/students/StudentAllExercises.vue')
        }
      ]
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: () => import('../views/UserTeacher.vue'),
      children: [
        {
          path: '/beteacher',
          name: 'beteacher',
          component: () => import('../components/BeTeacher.vue')
        },
        {
          path: '/mylesson',
          name: 'mylesson',
          component: () => import('../components/seeMyLesson.vue')
        },
        {
          path: 'exercise',
          component: () => import('../components/exercises/teachers/TeacherAllExercises.vue'),
        },
        {
          path: 'correct/:id?',
          component: () => import('../components/exercises/teachers/CorrectStudentsExercises.vue')
        },
        {
          path: 'qa/:id?',
          component: () => import('../components/exercises/teachers/QuestionNAnswer.vue')
        },
      ]
    },
    {
      path: '/information',
      component: () => import('../views/Personal.vue'),
      children: [
        {
          path: '/information/beteacher',
          component: () => import('../components/BeTeacher.vue')
        },
      ]
    },
    {
      path: '/lesson/insertLesson',
      name: 'insertLesson',
      component: () => import('../views/insertLessonPage.vue')
    },
    {
      path: '/lesson',
      name: 'lesson',
      component: () => import('../views/lessonPage.vue')
    },
    {
      path: '/',

      name: 'HomeVue',

      component: () => import('../views/Home.vue')
    },
    {
      path: '/lesson/lessonInterFace',
      name: 'lessonInfo',
      component: () => import('../views/lessonInterFace.vue')
    },
    {
      path: '/lesson/checkEdit',
      name: 'checkEdit',
      component: () => import('../views/checkEditLesson.vue')
    },
    {
      path: '/lesson/Edit',
      name: 'Edit',
      component: () => import('../views/editLesson.vue')
    },
    {
      path: '/exercise/:id?',
      component: () => import('@/components/exercises/students/StudentScore.vue')
    },
  ]
})

export default router
