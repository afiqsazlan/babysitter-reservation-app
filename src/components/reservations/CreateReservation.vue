<script setup lang="ts">

</script>

<template>
  <div class="space-y-2">
    <h1 class="font-bold text-2xl">Reserve a Babysitter</h1>
    <p class="text-slate-500">Please fill in the reservation details. Our customer service representative will contact
      you as soon as possible. </p>

  </div>
  <form>
    <div class="divide-y">
      <div class="py-8">
        <h2 class="font-medium mb-4">
          Your Contact Details
        </h2>
        <div class="space-y-2">
          <div class="flex flex-col space-y-2">
            <label class="text-stale-400 px-1">Name</label>
            <input class="border border-stale-400 rounded-lg py-1 px-3 ">
          </div>

          <div class="flex flex-col space-y-2">
            <label class="text-stale-400 px-1">Phone</label>
            <input class="border border-stale-400 rounded-lg py-1 px-3 ">
          </div>
        </div>
      </div>

      <div class="py-8">
        <h2 class="font-medium mb-4">
          Reservation Details
        </h2>

        <div class="space-y-4">
          <div class="flex flex-col col-span-2 space-y-2">
            <label class="text-stale-400 px-1">Address</label>
            <input class="border border-stale-400 rounded-lg py-1 px-3 ">
          </div>
          <div class="space-y-2">
            <label>Time</label>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col space-y-2">
                <label class="text-stale-400 px-1">Start</label>
                <input class="border border-stale-400 rounded-lg py-1 px-3 ">
              </div>
              <div class="flex flex-col space-y-2">
                <label class="text-stale-400 px-1">End</label>
                <input class="border border-stale-400 rounded-lg py-1 px-3 ">
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <label>Children</label>
            <div class="grid grid-cols-2 gap-4">

              <div class="flex flex-col space-y-2">
                <label class="text-stale-400 px-1">Name</label>
                <input type="text"
                       class="border border-stale-400 rounded-lg py-1 px-3 "
                >
              </div>
              <div class="flex flex-col space-y-2">
                <label class="text-stale-400 px-1">Age</label>
                <input type="number"
                       class="border border-stale-400 rounded-lg py-1 px-3 "
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div>
      <button class="bg-blue-500  text-white px-4 py-3 rounded-lg w-full hover:bg-opacity-90 text-lg font-medium tracking-wider">
        SUBMIT
      </button>
    </div>

  </form>
</template>

<style scoped>

</style>