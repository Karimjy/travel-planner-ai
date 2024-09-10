<template>
  <div class="m-5">
    <header class="w-full flex justify-between items-center mb-10">
      <h1>LOGO</h1>
      <cardProfile />
    </header>
    <div class="trips">
      <h1 class="text-center font-bold mb-10">Your Trips</h1>
      <div class="cities flex gap-8 flex-wrap justify-center md:justify-start">
        <NuxtLink
          v-for="city in data.itineraries"
          :key="city.id"
          :to="'/detail/' + city.id"
        >
          <cardCity
            :country="city.country"
            :city="city.city"
            :days="city.days.length"
            :src="city.image"
          />
        </NuxtLink>
      </div>
    </div>
    <NuxtLink
      to="/generator"
      class="absolute bottom-5 right-5 flex justify-center items-center w-[170px] h-[50px] rounded-[20px] bg-[#002A22] text-white hover:bg-[#002a22d4]"
    >
      Build new trip
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const { data } = await useFetch("/api/itineraries");
</script>

<style>
</style>