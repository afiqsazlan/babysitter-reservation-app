<script setup lang="ts">

import ErrorMessage from "@/components/form/ErrorMessage.vue";

interface Props {
  label: string
  name: string
  error?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col justify-between ">
    <div class="space-y-2">
      <label :for="name" class="text-stale-400 px-1 "> {{ label }} </label>
      <slot></slot>
    </div>
    <error-message v-if="error" :error="error" class="mt-1 "></error-message>
  </div>
</template>