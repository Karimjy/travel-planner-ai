<template>
  <div>
    <div class="w-[600px] m-auto">
      <h1 class="text-center font-title text-2xl mb-6">
        Plan your next adventure
      </h1>
      <div class="mb-4">
        <label class="block mb-2">Where do you want to go?</label>
        <input
          type="text"
          v-model="destination"
          placeholder="Paris, France"
          class="w-full p-2 border rounded-md"
        />
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
            <button
              @click="removePerson"
              class="w-[30px] h-[30px] flex items-center justify-center border rounded-full"
              :disabled="people <= 1"
            >
              -
            </button>
            <button
              @click="addPerson"
              class="w-[30px] h-[30px] flex items-center justify-center border rounded-full"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <button
        @click="createTrip"
        class="w-full p-3 bg-green-700 text-white font-semibold rounded-md"
      >
        Create New Trip
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const destination = ref("");
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

const createTrip = () => {
  console.log("Creating trip:", {
    destination: destination.value,
    startDate: startDate.value,
    endDate: endDate.value,
    people: people.value,
  });
  // Here you would typically send this data to your backend or perform further actions
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>