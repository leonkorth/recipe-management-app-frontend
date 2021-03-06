import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import IngredientsView from '../views/IngredientsView.vue'
import RecipesView from '../views/RecipesView.vue'
const routes = [
  {
    path: '/',
    redirect: '/about'
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: RecipesView
  },
  {
    path: '/ingredients',
    name: 'ingredients',
    component: IngredientsView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

export default router
