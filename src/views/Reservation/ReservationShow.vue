<script setup lang="ts">
import {useRoute} from 'vue-router';
import axios from "axios";
import {onMounted, ref} from "vue";

const route = useRoute();

const reservationRefNo = route.params.reservationRefNo;

const apiUrl = `${import.meta.env.VITE_API_BASE}/api`

const reservation = ref({});

async function findReservation() {
  try {
    const response = await axios.get(`${apiUrl}/reservations/${reservationRefNo}`)
    console.log({response});
  } catch (error) {
    console.log({error})
  }
}

onMounted(()=> {
  findReservation()
})
</script>

<template>
  <div>
    <h1>Booking {{ reservationRefNo }}</h1>
  </div>
</template>

<style scoped>

</style>