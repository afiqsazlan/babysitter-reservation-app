<script setup lang="ts">

import dayjs from 'dayjs';
import {reactive, ref} from "vue";
import axios from "axios";
import TextInput from "@/components/form/TextInput.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import ErrorMessage from "@/components/form/ErrorMessage.vue";
import FormGroup from "@/components/form/FormGroup.vue";

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
  children?: {
    [childIndex: number]: ChildError;
  };
}

interface ChildError {
  name?: string;
  date_of_birth?: string;
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

const childrenDateOfBirthDatepickerConfig = {
  min_date: now.subtract(13, "years").toDate(),
  max_date: now.subtract(1, "month").subtract(1, "day").toDate(),
  preselected_date: now.subtract(1, "month").subtract(1, "day").toDate(),
  year_range: [now.subtract(13, "years").year(), now.year()]
}

const reservationDatepickerConfig = {
  min_date: now.toDate(),
  max_date: now.add(60, 'days').toDate(),
  year_range: [now.year(), now.year() + 1]
};

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

function removeChild(index) {
  this.form.children.splice(index, 1);
}

function handleValidationErrorMessages(errorMessages) {
  errors.value.customer_name = errorMessages.customer_name?.[0] ?? null;
  errors.value.customer_phone = errorMessages.customer_phone?.[0] ?? null;
  errors.value.address = errorMessages.address?.[0] ?? null;
  errors.value.start_at = errorMessages.start_at?.[0] ?? null;
  errors.value.end_at = errorMessages.end_at?.[0] ?? null;

  const childrenErrors = {};
  Object.keys(errorMessages).forEach((key) => {
    if (key.startsWith('children.')) {
      const childIndex = key.split('.')[1];
      const childField = key.split('.')[2];

      if (!childrenErrors[childIndex]) {
        childrenErrors[childIndex] = {};
      }

      childrenErrors[childIndex][childField] = errorMessages[key][0];
    }
  });
  errors.value.children = childrenErrors;
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
  <div class="flex flex-col p-8 md:py-16 items-center justify-center">
    <div class="max-w-2xl">
      <div class="space-y-2">
        <h1 class="font-bold text-2xl">Reserve a Babysitter</h1>
        <p class="text-slate-500">Please fill in the reservation details. Our customer service representative will
          contact you as soon as possible.
        </p>

      </div>
      <form @submit.prevent="handleSubmit">
        <div class="divide-y">
          <div class="py-8">
            <h2 class="font-medium mb-4  text-xl ">
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
            <h2 class="font-medium mb-4  text-xl ">
              Reservation Details
            </h2>

            <div class="space-y-4">
              <text-input v-model="form.address"
                          label="Address"
                          name="address"
                          :error="errors.address"
              ></text-input>
              <div class="space-y-2">
                <label>Date and Time</label>
                <div class="flex flex-row items-center gap-4">
                  <VueDatePicker v-model="form.start_at"
                                 :min-date="reservationDatepickerConfig.min_date"
                                 :max-date="reservationDatepickerConfig.max_date"
                                 :year-range="reservationDatepickerConfig.year_range"
                                 :is24="false"
                                 auto-apply
                                 prevent-min-max-navigation
                                 input-class-name="py-2"
                  ></VueDatePicker>
                </div>
                <div class="flex flex-row items-center gap-4">
                  <error-message :error="errors.start_at"></error-message>
                  <error-message :error="errors.end_at"></error-message>
                </div>
              </div>

            </div>
          </div>

          <div class="py-8">

            <div class="flex flex-row justify-between items-center">
              <h2 class="font-medium text-xl ">
                Children
              </h2>
              <button @click.prevent="addChild"
                      class=" px-4 md:mt-4  py-1 md:py-2 bg-slate-600 tracking-wider hover:bg-opacity-90 rounded-lg text-white"
              >
                Add Child
              </button>
            </div>

            <div class="flex flex-col divide-y ">
              <div v-for="(child, index) in form.children"
                   :key="`children-${index}`"
                   class="flex flex-col space-y-2 pb-4 pt-4 md:pt-8 "
              >
                <div class="flex flex-row justify-between items-center">
                  <p class="font-medium md:text-lg">Child {{ index + 1 }}</p>
                  <button @click.prevent="removeChild(index)"
                          v-if="index"
                          class="text-red-500 border border-red-400 hover:bg-red-500 hover:text-white px-2 py-0.5 rounded-lg">
                    X
                  </button>
                </div>
                <text-input v-model="form.children[index].name"
                            label="Name"
                            :name="`child_${index}_name`"
                            :error="errors.children?.[index]?.name"
                            class="w-full text-sm"
                ></text-input>
                <form-group label="Date of Birth"
                            :name="`child_${index}_date_of_birth`"
                            :error="errors.children?.[index]?.date_of_birth"
                            class="w-full"
                >
                  <VueDatePicker v-model="form.children[index].date_of_birth"
                                 :enable-time-picker="false"
                                 :min-date="childrenDateOfBirthDatepickerConfig.min_date"
                                 :max-date="childrenDateOfBirthDatepickerConfig.max_date"
                                 :start-date="childrenDateOfBirthDatepickerConfig.preselected_date"
                                 :year-range="childrenDateOfBirthDatepickerConfig.year_range"
                                 auto-apply
                                 prevent-min-max-navigation
                  ></VueDatePicker>
                </form-group>

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
    </div>
  </div>
</template>

<style scoped>

</style>