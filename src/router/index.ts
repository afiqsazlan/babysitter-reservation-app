import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReservationShow from "@/views/Reservation/ReservationShow.vue";
import ReservationCreate from "@/views/Reservation/ReservationCreate.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/reservations/create',
            name: 'reservations.create',
            component: ReservationCreate
        },
        {
            path: '/reservations/:reservationRefNo',
            name: 'reservations.show',
            component: ReservationShow
        }
    ]
})

export default router
