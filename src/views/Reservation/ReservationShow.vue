<script setup lang="ts">
import {useRoute} from 'vue-router';
import axios, {AxiosResponse} from "axios";
import {onMounted, ref, computed} from "vue";
import dayjs from "dayjs";

const route = useRoute();

interface Reservation {
  customer_name: string;
  customer_phone: string;
  start_at: string | null;
  address: string;
  children: Child[];
}

interface Child {
  name: string;
  age: string;
}


const reservationRefNo : string = route.params.reservationRefNo;

const apiBaseUrl : string = import.meta.env.VITE_API_BASE;
const apiUrl  : string = `${apiBaseUrl}/api`

const reservation = ref<Reservation>({});
const isFetching = ref<boolean>(true);

async function findReservation(): Promise<void> {

  axios.defaults.withCredentials = true;

  await axios.get(`${apiBaseUrl}/sanctum/csrf-cookie`);

  try {
    const response: AxiosResponse<Reservation> = await axios.get(`${apiUrl}/reservations/${reservationRefNo}`)
    if (response.status === 200) {
      const data: Reservation = response.data.data;

      // Format reservation start time
      reservation.value = {
        customer_name: data.customer_name,
        customer_phone: data.customer_phone,
        start_at: data.start_at ? dayjs(data.start_at).format('DD MMMM YYYY hh:mm A') : null,
        address: data.address,
        children: data.children
      }
    }
  } catch (error) {
    console.log({error})
  }

  setIsFetching(false);
}

function setIsFetching(value = true) {
  isFetching.value = value;
}

const noReservationFound = computed<boolean>(() => {
  return !isFetching.value && Object.keys(reservation.value).length === 0;
});

onMounted(() => {
  findReservation()
})
</script>

<template>
  <div class="w-screen  h-screen flex flex-row py-16 justify-center">

    <div v-if="isFetching">
      Fetching your reservation...
    </div>
    <div v-else-if="noReservationFound">
      INVALID RESERVATION
    </div>
    <div v-else class="border border-slate-400 rounded-lg p-4 md:p-6 w-4/5 md:w-2/3 h-min">

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