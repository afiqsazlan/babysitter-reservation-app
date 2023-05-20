<script setup lang="ts">

import dayjs from 'dayjs';
import {reactive, ref} from "vue";
import axios from "axios";
import TextInput from "@/components/form/TextInput.vue";

interface Form {
  customer_name: string;
  customer_phone: string;
  address: string;
  start_at: Date | null;
  end_at: Date | null;
  children: Child[];
}

interface Child {
  name: string;
  date_of_birth: Date | null;
}

interface Error {
  customer_name: string,
  customer_phone: string
  address: string
  start_at: string
  end_at: string,
  children: ChildError[]
}

interface ChildError {
  name: string,
  date_of_birth: string
}

const now = dayjs();

const form: Form = reactive({
  customer_name: "",
  customer_phone: "",
  address: "",
  start_at: null,
  end_at: null,
  children: [
    {
      name: '',
      date_of_birth: null,
    }
  ]
});

const errors = ref<Error>({
  customer_name: '',
  customer_phone: '',
  address: '',
  start_at: '',
  end_at: '',
  children: []
});

async function handleSubmit() {
  console.log(form);

  resetErrors();

  axios.defaults.withCredentials = true;

  const apiBaseUrl = import.meta.env.VITE_API_BASE;
  const apiUrl = `${apiBaseUrl}/api`

  await axios.get(`${apiBaseUrl}/sanctum/csrf-cookie`);

  try {
    const response = await axios.post(`${apiUrl}/reservations`, form);
    console.log({response})
    return response.data;
  } catch (error) {
    if (error.response.status === 422) {
      console.log({
        messages: error.response.data.errors
      })
      handleValidationErrorMessages(error.response.data.errors);
    }
  }
}

function addChild() {
  form.children.push({
    name: '',
    date_of_birth: null
  })
}

function handleValidationErrorMessages(errorMessages) {
  const fieldMappings = {
    customer_name: 'customer_name',
    customer_phone: 'customer_phone',
    address: 'address',
    start_at: 'start_at',
    children: 'children'
  };

  Object.entries(errorMessages).forEach(([key, value]) => {
    const field = fieldMappings[key];
    if (field) {
      errors.value[field] = value[0];
    }
  });

  console.log({
    errors: errors.value
  })
}

function resetErrors() {
  errors.value = {
    customer_name: '',
    customer_phone: '',
    address: '',
    start_at: '',
    end_at: '',
    children: []
  }
}

</script>

<template>
  <div class="space-y-2">
    <h1 class="font-bold text-2xl">Reserve a Babysitter</h1>
    <p class="text-slate-500">Please fill in the reservation details. Our customer service representative will contact
      you as soon as possible. </p>

  </div>
  <form @submit.prevent="handleSubmit">
    <div class="divide-y">
      <div class="py-8">
        <h2 class="font-medium mb-4">
          Your Contact Details
        </h2>
        <div class="space-y-2">
          <text-input v-model="form.customer_name"
                      label="Name"
                      name="name"
                      :error="errors.customer_name"
          ></text-input>
          <text-input v-model="form.customer_phone"
                      label="Phone"
                      name="phone"
                      :error="errors.customer_phone"
          ></text-input>
        </div>
      </div>

      <div class="py-8">
        <h2 class="font-medium mb-4">
          Reservation Details
        </h2>

        <div class="space-y-4">
          <text-input v-model="form.address"
                      label="Address"
                      name="address"
                      :error="errors.address"
          ></text-input>
          <div class="space-y-2">
            <label>Time</label>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col space-y-2">
                <label class="text-stale-400 px-1">Start</label>
                <input v-model="form.start_at"
                       class="border border-stale-400 rounded-lg py-1 px-3 "
                >
              </div>
              <div class="flex flex-col space-y-2">
                <label class="text-stale-400 px-1">End</label>
                <input v-model="form.end_at"
                       class="border border-stale-400 rounded-lg py-1 px-3 "
                >
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <label>Children</label>
            <div class="flex flex-col ">
              <template v-for="(child, index) in form.children"
                        :key="`children-${index}`"
              >
                <div class="grid grid-cols-7 items-end space-x-4">
                  <text-input v-model="form.address"
                              label="Name"
                              :name="`child_${index}_name`"
                              :error="errors.children[index]?.name"
                              class="col-span-4"
                  ></text-input>

                  <div class="flex flex-col space-y-2 col-span-2  w-full">
                    <label class="text-stale-400 px-1">Date of Birth</label>
                    <input type="number"
                           v-model="child.date_of_birth"
                           class="border border-stale-400 rounded-lg py-1 px-3 "
                    >
                  </div>
                  <div class="col-span-1 flex justify-end">
                    <button v-if="index === form.children.length - 1"
                            @click.prevent="addChild"
                            class="p-4 bg-green-500 rounded-lg text-2xl text-white"> +
                    </button>
                  </div>
                </div>
              </template>

            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="mt-16 flex flex-row justify-end">
      <button type="submit"
              class="bg-blue-500  text-white px-6 py-2 rounded-lg hover:bg-opacity-90 text-lg font-medium tracking-wider">
        SUBMIT
      </button>
    </div>

  </form>
</template>

<style scoped>

</style>