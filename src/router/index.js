import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/rooms',
    name: 'rooms',
    component: () => import('../views/Rooms.vue')
  },
  {
    path: '/rooms/:slug',
    name: 'room-details',
    component: () => import('../views/RoomDetails.vue'),
    props: true
  },
  {
    path: '/booking',
    name: 'booking',
    component: () => import('../views/Booking.vue')
  },
  {
    path: '/experiences',
    name: 'experiences',
    component: () => import('../views/Experiences.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/Aurelia-Grand/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

export default router
