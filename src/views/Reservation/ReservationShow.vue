<script setup lang="ts">
import {useRoute} from 'vue-router';
import axios from "axios";
import {onMounted, ref} from "vue";
import dayjs from "dayjs";

const route = useRoute();

const reservationRefNo = route.params.reservationRefNo;


const apiBaseUrl = import.meta.env.VITE_API_BASE;
const apiUrl = `${apiBaseUrl}/api`

const reservation = ref({});

async function findReservation() {

  axios.defaults.withCredentials = true;

  await axios.get(`${apiBaseUrl}/sanctum/csrf-cookie`);

  try {
    const response = await axios.get(`${apiUrl}/reservations/${reservationRefNo}`)
    if (response.status === 200) {
      const data = response.data.data;

      // Format reservation start time
      reservation.value = {
        customer_name: data.customer_name,
        customer_phone: data.customer_phone,
        start_at: data.start_at ? dayjs(data.start_at).format('YYYY-MM-DD hh:mm A') : null,
        address: data.address,
        children: data.children
      }
      console.log({reserve: reservation.value})
    }
  } catch (error) {
    console.log({error})
  }
}

onMounted(() => {
  findReservation()
})
</script>

<template>
  <div class="w-screen  h-screen flex flex-row py-16 justify-center">
    <div class="border border-slate-400 rounded-lg p-4 md:p-6 w-4/5 md:w-2/3 h-min">

      <div class="flex flex-col md:flex-row justify-between md:items-end ">
        <h1 class="font-bold text-xl md:text-2xl">
          Reservation Summary
        </h1>
        <h2 class=" md:text-right md:bg-slate-300 md:px-4 py-1 md:py-2 rounded-lg">
          Reference No: <span class="text-slate-700 font-medium">{{ reservationRefNo }}</span>
        </h2>
      </div>

      <div class="mt-2 md:mt-4 pb-4 border-b border-slate-100">
        <h2 class="font-medium md:text-lg text-slate-600  underline">
          Contact Details
        </h2>
        <ul class=" mt-2 md:mt-4 space-y-2 md:space-y-6 ">
          <li class="space-y-1 my-2">
            <p>Name</p>
            <p class="font-medium">
              {{ reservation.customer_name }}
            </p>
          </li>
          <li class="space-y-1 my-2">
            <p>Phone</p>
            <p class="font-medium">
              {{ reservation.customer_phone }}
            </p>
          </li>
        </ul>
      </div>

      <div class="mt-4 pb-4 border-b border-slate-100">
        <h2 class="font-medium md:text-lg text-slate-600  underline">
          Reservation Details
        </h2>
        <ul class=" mt-2 md:mt-4 space-y-2 md:space-y-6 ">
          <li class="space-y-1 my-2">
            <p>Address</p>
            <p class="font-medium">
              {{ reservation.address }}
            </p>
          </li>
          <li class="space-y-1 my-2">
            <p>Date and Time</p>
            <p class="font-medium">
              {{ reservation.start_at }}
            </p>
          </li>
        </ul>
      </div>

      <div class="mt-4 ">
        <h2 class="font-medium md:text-lg text-slate-600  underline">
          Children
        </h2>
        <ul class="px-4">
          <li v-for="(child, index) in reservation.children"
              :key="`child-${index}`"
              class="py-2 list-decimal pl-2"
          >
            <p class="font-medium">{{ child.name }}</p>
            <p class="text-slate-500">{{ child.age }}</p>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>