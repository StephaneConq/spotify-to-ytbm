import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlaylistTracksView from '../views/PlaylistTracksView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/playlist/:id/tracks',
    name: 'tracks',
    component: PlaylistTracksView
  },
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
