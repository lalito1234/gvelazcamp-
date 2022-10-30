import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import EventLayout from '@/views/events/EventLayout';
import EventDetails from '@/views/events/EventDetails';
import EventLocation from '@/views/events/EventLocation';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
	{
		path: "/Character/:id",
		name: "EventLayout",
		props: true,
		component: EventLayout,
		children: [
			{
				path: "",
				name: "EventDetails",
				component: EventDetails
			},
			{
				path: "Location",
				name: "EventLocation",
				component: EventLocation
			}
		]
	},
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
