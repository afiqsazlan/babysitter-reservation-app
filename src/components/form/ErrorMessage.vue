<script setup lang="ts">

interface Props {
  error?: string
}

defineProps<Props>()

</script>

<template>
  <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
</template>

<style scoped>

</style>