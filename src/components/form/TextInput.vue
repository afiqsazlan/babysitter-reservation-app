<script setup lang="ts">

import ErrorMessage from "@/components/form/ErrorMessage.vue";

interface Props {
  modelValue: string
  label: string
  name: string
  error?: string
  type?: string;
}

defineProps<Props>()
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-col">
    <label :for="name"
           class="text-stale-400 px-1 mb-2"
    >
      {{ label }}
    </label>
    <input :id="name"
           :value="modelValue"
           :type="type || 'text'"
           @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
           class="border border-stale-400 rounded-lg py-2 px-3 "
    />

    <!--  Error message -->
    <error-message v-if="error"
                   :error="error"
                   class="mt-1"
    ></error-message>
  </div>
</template>

<style scoped>

</style>