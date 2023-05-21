<script setup lang="ts">
</script>

<template>
  <div class="w-screen  h-screen flex flex-col py-16 items-center justify-center">

    <h1 class="font-bold text-lg md:text-2xl"> Are you looking for a babysitter? </h1>
    <router-link :to="{ name: 'reservations.create' }"
                 class="bg-blue-500 mt-6 py-4 px-6 rounded-lg md:text-lg tracking-wider text-white hover:bg-opacity-90"
    >
      Make a reservation!
    </router-link>
  </div>
</template>
