<script setup lang="ts">

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
  <div class="flex flex-col space-y-2">
    <label :for="name"
           class="text-stale-400 px-1"
    >
      {{ label }}
    </label>
    <input :id="name"
           :value="modelValue"
           :type="type || 'text'"
           @input="$emit('update:modelValue', $event.target.value)"
           class="border border-stale-400 rounded-lg py-3 px-3 "
    />

    <!--  Error message -->
    <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
  </div>
</template>

<style scoped>

</style>