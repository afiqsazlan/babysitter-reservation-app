import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReservationShow from "@/views/Reservation/ReservationShow.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/reservations/:reservationRefNo',
            name: 'reservations.show',
            component: ReservationShow
        }
    ]
})

export default router
