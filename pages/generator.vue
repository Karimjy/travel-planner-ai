<template>
  <div>
    <div class="w-[600px] m-auto">
      <h1 class="text-center font-title text-2xl mb-6">
        Plan your next adventure
      </h1>
      <div class="mb-4">
        <label class="block mb-2">Country name?</label>
        <input type="text" v-model="country" placeholder="France" class="w-full p-2 border rounded-md" />
      </div>
      <div class="mb-4">
        <label class="block mb-2">City name?</label>
        <input type="text" v-model="city" placeholder="Paris" class="w-full p-2 border rounded-md" />
      </div>
      <div class="mb-4">
        <div class="flex items-center space-x-4">
          <div class="flex items-center border rounded-md p-2">
            <span class="material-symbols-outlined">calendar_today</span>
            <input type="date" v-model="startDate" class="ml-2" />
            <span class="mx-2">~</span>
            <input type="date" v-model="endDate" class="mr-2" />
          </div>
        </div>
      </div>

      <div class="mb-4">
        <label class="block mb-2">How many people are going?</label>
        <div class="flex items-center space-x-4 border rounded-md p-2">
          <span>{{ people }}</span>
          <span>{{ people === 1 ? "Person" : "People" }}</span>
          <div class="flex space-x-2">
            <button @click="removePerson" class="w-[30px] h-[30px] flex items-center justify-center border rounded-full"
              :disabled="people <= 1">
              -
            </button>
            <button @click="addPerson" class="w-[30px] h-[30px] flex items-center justify-center border rounded-full">
              +
            </button>
          </div>
        </div>
      </div>
      <button @click="createTrip" class="w-full p-3 bg-green-700 text-white font-semibold rounded-md">
        Create New Trip
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const country = ref("Japon");
const city = ref("Tokyo");
const startDate = ref("");
const endDate = ref("");
const people = ref(1);

const addPerson = () => {
  people.value++;
};

const removePerson = () => {
  if (people.value > 1) {
    people.value--;
  }
};

function daysBetween(date1: string | Date, date2: string | Date): number  {
    // Convert both inputs to Date objects if they are strings
    const date1_ms = new Date(date1).getTime();
    const date2_ms = new Date(date2).getTime();

    // Calculate the difference in milliseconds
    const difference_ms = Math.abs(date2_ms - date1_ms);

    // Convert milliseconds to days (1000 ms/s * 60 s/min * 60 min/h * 24 h/day)
    const daysDifference = Math.ceil(difference_ms / (1000 * 60 * 60 * 24));

    return daysDifference;
}


const createTrip = async () => {

  let num_days = daysBetween(startDate.value, endDate.value)

  console.log("Creating trip:", {
    country: country.value,
    city: city.value,
    startDate: startDate.value,
    endDate: endDate.value,
    num_days:num_days,
    people: people.value,

  });

  try {
    const { data } = await useFetch('/api/itinerary', {
      method: 'POST',
      body: {
        country: country.value,
        city: city.value,
        startDate: startDate.value,
        endDate: endDate.value,
        num_days: num_days,
        people: people.value,
      }
    })
    console.log('Itinerary created:', data.value)
    if (data.value) {
      await navigateTo('/detail/'+ data.value.itinerary.id)
    }
  } catch (error) {
    console.error('Error creating itinerary:', error)
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>